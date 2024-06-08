using CarPriceComparison.API.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CarPriceComparison.API.Controllers;

[EnableCors("any")]
[ApiController]
[Route("user")]
public class UserController : ControllerBase
{ 
    [HttpGet("{id:int}")]
    public ActionResult<User> GetById(int id)
    {
        return Ok(new User(1, "11"));
    }
    
    [HttpGet("")]
    public ActionResult<IEnumerable<User>> GetList(int pageIndex, int pageNum)
    {
        return Ok(new User(1, "11"));
    }
    
    [HttpPost]
    public ActionResult<User> Add(User user)
    {
        return Ok(user);
    }
    
    [HttpPut("{id:int}")]
    public IActionResult Update(int id, User student)
    {
        return Ok(true);
    }
    
    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        return Ok(true);
    }
    
}