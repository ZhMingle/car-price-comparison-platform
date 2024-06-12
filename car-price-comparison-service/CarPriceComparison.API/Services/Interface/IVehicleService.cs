using CarPriceComparison.API.Models;
using CarPriceComparison.API.Models.DTO;

namespace CarPriceComparison.API.Services.Interface;

public interface IVehicleService
{
    VehicleList GetAll(int pageNum, int pageSize);
    Vehicle GetById(long vehicleId);
    Task Add(Vehicle vehicle);
    bool Update(Vehicle vehicle);
    bool UpdatePartial(long vehicleId, UpdateVehicleDto vehicleDto);
    bool Delete(long vehicleId);
}