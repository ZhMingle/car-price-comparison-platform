using CarPriceComparison.API.Models;
using CarPriceComparison.API.UserServices;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CarPriceComparison.API.Controllers;

/// <summary>
/// Manages user operations.
/// </summary>
[EnableCors("any")]
[ApiController]
[Route("user123")]
public class UserController : ControllerBase
{ 
    
    private readonly UserService _userService;

    // IOC UserService
    public UserController(UserService userService)
    {
        _userService = userService;
    }
    
    /// <summary>
    /// Get page users. For example: pageIndex = 0, pageNum = 10. It means that we can get 10 items from first page.
    /// </summary>
    /// <returns>A list of users.</returns>
    [HttpGet("")]
    public ActionResult<IEnumerable<User>> GetList(int pageIndex, int pageNum)
    {
        return Ok(_userService.GetAll(pageIndex,pageNum));
    }
    
    /// <summary>
    /// Gets a user by userId.
    /// </summary>
    /// <param name="userId">The ID of the user.</param>
    /// <returns>The user with the specified userId.</returns>
    [HttpGet("{userId:int}")]
    public ActionResult<User> GetById(int userId)
    {
        return Ok(_userService.GetById(userId));
    }
    
    /// <summary>
    /// Creates a new user.
    /// </summary>
    /// <param name="user">The user to create.</param>
    /// <returns>The created user.</returns>
    [HttpPost]
    public ActionResult<User> Add(User user)
    {
        return Ok(_userService.Add(user));
    }
    
    /// <summary>
    /// Updates an existing user.
    /// </summary>
    /// <param name="userId">The ID of the user to update.</param>
    /// <param name="user">The updated user data.</param>
    /// <returns>No content if successful.</returns>
    [HttpPut("{userId:int}")]
    public IActionResult Update(int userId, User user)
    {
        _userService.Update(user);
        
        return NoContent();
    }
    
    /// <summary>
    /// Deletes a user.
    /// </summary>
    /// <param name="userId">The ID of the user to delete.</param>
    /// <returns>No content if successful.</returns>
    [HttpDelete("{userId:int}")]
    public IActionResult Delete(int userId)
    {
        _userService.Delete(userId);
        
        return NoContent();
    }
    
}