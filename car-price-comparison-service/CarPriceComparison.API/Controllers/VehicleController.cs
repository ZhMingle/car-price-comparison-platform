
using CarPriceComparison.API.Models;
using CarPriceComparison.API.Models.DTO;
using CarPriceComparison.API.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CarPriceComparison.API.Controllers;

/// <summary>
/// Manages car operations.
/// </summary>
[EnableCors("any")]
[ApiController]
[Route("vehicle")]
public class VehicleController : ControllerBase
{ 
    private readonly VehicleService _vehicleService;

    // IOC VehicleService
    public VehicleController(VehicleService vehicleService)
    {
        _vehicleService = vehicleService;
    }
    
    /// <summary>
    /// Gets paginated vehicles.
    /// </summary>
    /// <param name="pageNumber">The page number. From 1 to more</param>
    /// <param name="pageSize">The number of items per page.</param>
    /// <returns>A list of vehicles.</returns>
    /// <response code="200">successfully return</response>
    [HttpGet("")]
    public ActionResult<VehicleList> GetList(string? brand, string? model, int? year, int pageNumber = 1, int pageSize = 10)
    {
        return Ok(_vehicleService.GetAll(brand, model, year, pageNumber, pageSize));
    }
    
    /// <summary>
    /// Gets a vehicle by vehicleId.
    /// </summary>
    /// <param name="vehicleId">The ID of the vehicle.</param>
    /// <returns>The vehicle with the specified vehicleId.</returns>
    /// <response code="200">successfully return</response>
    [HttpGet("{vehicleId:long}")]
    public ActionResult<Vehicle> GetById(long vehicleId)
    {
        var vehicle = _vehicleService.GetById(vehicleId);
        if (null == vehicle)
        {
            return NotFound();
        }
        
        return Ok(new VehicleList(1, new[] { vehicle }));
    }
    
    /// <summary>
    /// Updates an existing vehicle.
    /// </summary>
    /// <param name="vehicle">The updated vehicle data.</param>
    /// <returns>No content if successful.</returns>
    /// <response code="200">successfully return</response>
    [HttpPut("")]
    public IActionResult Update([FromBody] VehicleUpdateDto vehicleDto)
    {
        var result = _vehicleService.Update(vehicleDto);
        if (!result)
        {
            return NotFound();
        }

        return Ok();
    }
    
    /// <summary>
    /// Deletes a vehicle.
    /// </summary>
    /// <param name="vehicleId">The ID of the vehicle to delete.</param>
    /// <returns>No content if successful.</returns>
    /// <response code="200">successfully return</response>
    [HttpDelete("{vehicleId:long}")]
    public IActionResult Delete(long vehicleId)
    {
        var result = _vehicleService.Delete(vehicleId);
        if (!result)
        {
            return NotFound();
        }
        return Ok();
    }
}