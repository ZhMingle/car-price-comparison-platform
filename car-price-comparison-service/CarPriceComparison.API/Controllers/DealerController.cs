using CarPriceComparison.API.Models;
using CarPriceComparison.API.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CarPriceComparison.API.Controllers;

/// <summary>
/// Manages dealer operations.
/// </summary>
[EnableCors("any")]
[ApiController]
[Route("dealer")]
public class DealerController : ControllerBase
{ 
    
    private readonly DealerService _dealerService;

    // IOC DealerService
    public DealerController(DealerService dealerService)
    {
        _dealerService = dealerService;
    }
    
    /// <summary>
    /// Gets paginated dealers.
    /// </summary>
    /// <param name="pageNumber">The page number. From 1 to more</param>
    /// <param name="pageSize">The number of items per page.</param>
    /// <returns>A list of dealers.</returns>
    /// <response code="200">successfully return</response>
    [HttpGet("")]
    public ActionResult<DealerList> GetList(int pageNumber = 1, int pageSize = 10)
    {
        return Ok(_dealerService.GetAll(pageNumber, pageSize));
    }
    
    /// <summary>
    /// Gets a dealer by dealerId.
    /// </summary>
    /// <param name="dealerId">The ID of the dealer.</param>
    /// <returns>The dealer with the specified dealerId.</returns>
    /// <response code="200">successfully return</response>
    [HttpGet("{dealerId:long}")]
    public ActionResult<Dealer> GetById(long dealerId)
    {
        var dealer = _dealerService.GetById(dealerId);
        if (null == dealer)
        {
            return NotFound();
        }
        
        return Ok(dealer);
    }
    
    /// <summary>
    /// Creates a new dealer.
    /// </summary>
    /// <param name="dealer">The dealer to create.</param>
    /// <returns>The created dealer.</returns>
    /// <response code="200">successfully return</response>
    [HttpPost]
    public IActionResult Add(DealerCreateDto createDto)
    {
        _dealerService.Add(createDto);
        return Ok();
    }
    
    /// <summary>
    /// Updates an existing dealer.
    /// </summary>
    /// <param name="dealer">The updated dealer data.</param>
    /// <returns>No content if successful.</returns>
    /// <response code="200">successfully return</response>
    [HttpPut("")]
    public IActionResult Update([FromBody] DealerUpdateDto dealerUpdateDto)
    {
        var result = _dealerService.Update(dealerUpdateDto);
        if (!result)
        {
            return NotFound();
        }
        return Ok();
    }
    
    /// <summary>
    /// Deletes a dealer.
    /// </summary>
    /// <param name="dealerId">The ID of the dealer to delete.</param>
    /// <returns>No content if successful.</returns>
    /// <response code="200">successfully return</response>
    [HttpDelete("{dealerId:long}")]
    public IActionResult Delete(long dealerId)
    {
        var result = _dealerService.Delete(dealerId);
        if (!result)
        {
            return NotFound();
        }
        return Ok();
    }
    
}