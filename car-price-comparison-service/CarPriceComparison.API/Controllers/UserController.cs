using CarPriceComparison.API.Models;
using CarPriceComparison.API.UserServices;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CarPriceComparison.API.Controllers;

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
    
    [HttpGet("")]
    public ActionResult<IEnumerable<User>> GetList(int pageIndex, int pageNum)
    {
        return Ok(_userService.GetAll(pageIndex,pageNum));
    }
    
    [HttpGet("{userId:int}")]
    public ActionResult<User> GetById(int userId)
    {
        return Ok(_userService.GetById(userId));
    }
    
    [HttpPost]
    public ActionResult<User> Add(User user)
    {
        return Ok(_userService.Add(user));
    }
    
    [HttpPut("{userId:int}")]
    public IActionResult Update(int userId, User user)
    {
        _userService.Update(user);
        
        return NoContent();
    }
    
    [HttpDelete("{userId:int}")]
    public IActionResult Delete(int userId)
    {
        _userService.Delete(userId);
        
        return NoContent();
    }
    
}