﻿using CarPriceComparison.API.Models;
using CarPriceComparison.API.Models.DTO;
using CarPriceComparison.API.Services;
using CarPriceComparison.API.UserServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CarPriceComparison.API.Controllers;

/// <summary>
/// Manages user operations.
/// </summary>
[EnableCors("any")]
[ApiController]
[Route("user")]
public class UserController : ControllerBase
{ 
    
    private readonly UserService _userService;

    // IOC UserService
    public UserController(UserService userService)
    {
        _userService = userService;
    }
    
    /// <summary>
    /// Gets paginated users.
    /// </summary>
    /// <param name="pageNumber">The page number. From 1 to more</param>
    /// <param name="pageSize">The number of items per page.</param>
    /// <returns>A list of users.</returns>
    /// <response code="200">successfully return</response>
    [HttpGet("")]
    public ActionResult<UserList> GetList(int pageNumber = 1, int pageSize = 10)
    {
        return Ok(_userService.GetAll(pageNumber, pageSize));
    }
    
    /// <summary>
    /// Gets a user by userId.
    /// </summary>
    /// <param name="userId">The ID of the user.</param>
    /// <returns>The user with the specified userId.</returns>
    /// <response code="200">successfully return</response>
    [HttpGet("{userId:long}")]
    public ActionResult<User> GetById(long userId)
    {
        var user = _userService.GetById(userId);
        if (null == user)
        {
            return NotFound();
        }
        
        return Ok(user);
    }
    
    /// <summary>
    /// Creates a new user.
    /// </summary>
    /// <param name="user">The user to create.</param>
    /// <returns>The created user.</returns>
    /// <response code="200">successfully return</response>
    [HttpPost]
    public IActionResult Add(UserCreateDto createDto)
    {
        _userService.Add(createDto);
        return Ok();
    }
    
    /// <summary>
    /// Updates an existing user.
    /// </summary>
    /// <param name="user">The updated user data.</param>
    /// <returns>No content if successful.</returns>
    /// <response code="200">successfully return</response>
    [HttpPut("")]
    public IActionResult Update([FromBody] UserUpdateDto userUpdateDto)
    {
        var result = _userService.Update(userUpdateDto);
        if (!result)
        {
            return NotFound();
        }
        return Ok();
    }
    
    /// <summary>
    /// Partially updates an existing user.
    /// </summary>
    /// <param name="dto">The user data with fields to update.</param>
    /// <returns>No content if successful.</returns>
    /// <response code="200">successfully return</response>
    [HttpPatch("")]
    public IActionResult UpdateUserPartial([FromBody] UserUpdateDto dto)
    {
        var result = _userService.UpdatePartial(dto);
        if (!result)
        {
            return NotFound();
        }
        return Ok();
    }
    
    /// <summary>
    /// Deletes a user.
    /// </summary>
    /// <param name="userId">The ID of the user to delete.</param>
    /// <returns>No content if successful.</returns>
    /// <response code="200">successfully return</response>
    [HttpDelete("{userId:long}")]
    public IActionResult Delete(long userId)
    {
        var result = _userService.Delete(userId);
        if (!result)
        {
            return NotFound();
        }
        return Ok();
    }
    
}