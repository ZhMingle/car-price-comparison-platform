﻿using CarPriceComparison.API.Models;
using CarPriceComparison.API.Models.DTO;
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
    /// <param name="pageNumber">The page number. From 0 to more</param>
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
    public IActionResult Add(User user)
    {
        _userService.Add(user);
        return NoContent();
    }
    
    /// <summary>
    /// Updates an existing user.
    /// </summary>
    /// <param name="userId">The ID of the user to update.</param>
    /// <param name="user">The updated user data.</param>
    /// <returns>No content if successful.</returns>
    /// <response code="200">successfully return</response>
    [HttpPut("{userId:long}")]
    public IActionResult Update(long userId, [FromBody] User user)
    {
        if (userId != user.UserId)
        {
            return BadRequest();
        }

        var result = _userService.Update(user);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }
    
    /// <summary>
    /// Partially updates an existing user.
    /// </summary>
    /// <param name="userId">The ID of the user to update.</param>
    /// <param name="userDto">The user data with fields to update.</param>
    /// <returns>No content if successful.</returns>
    /// <response code="200">successfully return</response>
    [HttpPatch("{userId:long}")]
    public IActionResult UpdateUserPartial(long userId, [FromBody] UpdateUserDto userDto)
    {
        var result = _userService.UpdatePartial(userId, userDto);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
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
        return NoContent();
    }
    
}