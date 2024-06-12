using CarPriceComparison.API.Models;
using CarPriceComparison.API.Models.DTO;

namespace CarPriceComparison.API.Services.Interface;

public interface IVehicleService
{
    VehicleList GetAll(int pageNum, int pageSize);
    Vehicle GetById(long vehicleId);
    bool Add(VehicleCreateDto vehicleDto);
    bool Update(VehicleUpdateDto vehicleDto);
    bool Delete(long vehicleId);
}