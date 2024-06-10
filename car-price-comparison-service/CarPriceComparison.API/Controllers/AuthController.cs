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

    public AuthController(TokenService tokenService)
    {
        _tokenService = tokenService;
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
    public IActionResult Login([FromBody] LoginModel model)
    {
        // auth user
        if (model.Username == "test" && model.Password == "password")
        {
            var token = _tokenService.GenerateToken(model.Username);
            return Ok(new { token });
        }

        return Unauthorized();
    }
}

public class LoginModel
{
    public string Username { get; set; }
    public string Password { get; set; }
}