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
    
    [HttpGet("{id:int}")]
    public ActionResult<User> GetById(int id)
    {
        return Ok(_userService.GetById(id));
    }
    
    [HttpPost]
    public ActionResult<User> Add(User user)
    {
        return Ok(_userService.Add(user));
    }
    
    [HttpPut("{id:int}")]
    public IActionResult Update(int id, User user)
    {
        _userService.Update(user);
        
        return NoContent();
    }
    
    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        _userService.Delete(id);
        
        return NoContent();
    }
    
}