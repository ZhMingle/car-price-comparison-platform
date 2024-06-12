
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
    public ActionResult<VehicleList> GetList(int pageNumber = 1, int pageSize = 10)
    {
        return Ok(_vehicleService.GetAll(pageNumber, pageSize));
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
        
        return Ok(vehicle);
    }
    
    /// <summary>
    /// Creates a new vehicle.
    /// </summary>
    /// <param name="Vehicle">The vehicle to create.</param>
    /// <returns>The created vehicle.</returns>
    /// <response code="200">successfully return</response>
    [HttpPost]
    public IActionResult Add(Vehicle vehicle)
    {
        _vehicleService.Add(vehicle);
        return Ok();
    }
    
    /// <summary>
    /// Updates an existing vehicle.
    /// </summary>
    /// <param name="vehicleId">The ID of the vehicle to update.</param>
    /// <param name="vehicle">The updated vehicle data.</param>
    /// <returns>No content if successful.</returns>
    /// <response code="200">successfully return</response>
    [HttpPut("{vehicleId:long}")]
    public IActionResult Update(long vehicleId, [FromBody] Vehicle vehicle)
    {
        if (vehicleId != vehicle.VehicleId)
        {
            return BadRequest();
        }

        var result = _vehicleService.Update(vehicle);
        if (!result)
        {
            return NotFound();
        }

        return Ok();
    }
    
    /// <summary>
    /// Partially updates an existing vehicle.
    /// </summary>
    /// <param name="vehicleId">The ID of the vehicle to update.</param>
    /// <param name="vehicleDto">The vehicle data with fields to update.</param>
    /// <returns>No content if successful.</returns>
    /// <response code="200">successfully return</response>
    [HttpPatch("{vehicleId:long}")]
    public IActionResult UpdatePartial(long vehicleId, [FromBody] VehicleUpdateDto vehicleUpdateDto)
    {
        var result = _vehicleService.UpdatePartial(vehicleId, vehicleUpdateDto);
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