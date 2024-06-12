using CarPriceComparison.API.Models;
using CarPriceComparison.API.Models.DTO;

namespace CarPriceComparison.API.Services.Interface;

public interface IVehicleService
{
    VehicleList GetAll(int pageNum, int pageSize);
    Vehicle GetById(long vehicleId);
    bool Add(Vehicle vehicle);
    bool Update(Vehicle vehicle);
    bool UpdatePartial(long vehicleId, VehicleUpdateDto dto);
    bool Delete(long vehicleId);
}