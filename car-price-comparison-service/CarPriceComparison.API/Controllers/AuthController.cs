using CarPriceComparison.API.Models;
using CarPriceComparison.API.Models.Base;
using CarPriceComparison.API.Models.DTO;
using CarPriceComparison.API.Services;
using CarPriceComparison.API.UserServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CarPriceComparison.API.Controllers;

/// <summary>
/// Controller for handling authentication.
/// </summary>
[EnableCors("any")]
[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly TokenService _tokenService;
    private readonly UserService _userService;

    public AuthController(TokenService tokenService, UserService userService)
    {
        _tokenService = tokenService;
        _userService = userService;
    }
    
    /// <summary>
    /// Authenticates a user and returns a JWT token.
    /// </summary>
    /// <param name="model">The login model containing username and password.</param>
    /// <returns>A JWT token if authentication is successful.</returns>
    /// <response code="200">Returns the JWT token</response>
    /// <response code="401">If the credentials are invalid</response>
    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        // auth user
        var user = await _userService.ValidateUser(model.Username, model.Password);
        if (null == user)
        {
            return Unauthorized("username or password is wrong");
        }

        var token = _tokenService.GenerateToken(model.Username);
        return Ok(new { token });
    }
    
    /// <summary>
    /// Registers a new user and returns a success message.
    /// </summary>
    /// <param name="model">The register model containing user details.</param>
    /// <returns>A success message if registration is successful.</returns>
    /// <response code="200">If the user is successfully registered</response>
    /// <response code="400">If the username already exists or validation fails</response>
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto model)
    {
        var result = _userService.CheckUsernameExist(model.Username);
        if (!result)
        {
            return BadRequest("username has been existed");
        }

        var user = new User();
        user.Username = model.Username;
        user.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);
        user.Email = model.Email;
        user.Mobile = model.Mobile;
        user.Status = Constants.UserStatus.Normal;
        user.CreateUserId = Constants.AdminUser.CreateUserId;
        user.CreateTime = DateTime.Now;
        user.UpdateTime = DateTime.Now;

        await _userService.Add(user);
        
        return Ok();
    }
}
