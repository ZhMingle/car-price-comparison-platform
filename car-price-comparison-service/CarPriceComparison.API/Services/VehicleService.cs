using CarPriceComparison.API.Data;
using CarPriceComparison.API.Models;
using CarPriceComparison.API.Models.DTO;
using CarPriceComparison.API.Services.Interface;

namespace CarPriceComparison.API.Services;

public class VehicleService : IVehicleService
{
    
    private readonly ApplicationDbContext _context;

    public VehicleService(ApplicationDbContext context)
    {
        _context = context;
    }


    public VehicleList GetAll(int pageNumber, int pageSize)
    {
        var totalRecords = _context.Vehicles.Count();
        var vehicles = _context.Vehicles.OrderBy(u => u.VehicleId)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        return new VehicleList(totalRecords, vehicles);
    }

    public Vehicle GetById(long vehicleId)
    {
        return _context.Vehicles.Find(vehicleId);
    }

    public async Task Add(Vehicle vehicle)
    {
        _context.Vehicles.Add(vehicle);
        await _context.SaveChangesAsync();
    }

    public bool Update(Vehicle vehicle)
    {
        var existVehicle = _context.Vehicles.Find(vehicle.VehicleId);
        if (null == existVehicle)
        {
            return false;
        }
        
        existVehicle.Brand = vehicle.Brand;
        // we can add more fields here

        _context.SaveChanges();
        return true;
    }

    public bool UpdatePartial(long vehicleId, UpdateVehicleDto vehicleDto)
    {
        var existingVehicle = _context.Vehicles.Find(vehicleId);
        if (existingVehicle == null)
        {
            return false;
        }

        // 动态更新字段
        var properties = typeof(UpdateVehicleDto).GetProperties();
        foreach (var property in properties)
        {
            var newValue = property.GetValue(vehicleDto);
            if (newValue != null && !newValue.Equals(GetDefault(property.PropertyType)))
            {
                var propertyInfo = existingVehicle.GetType().GetProperty(property.Name);
                if (propertyInfo != null && propertyInfo.CanWrite)
                {
                    propertyInfo.SetValue(existingVehicle, newValue);
                    _context.Entry(existingVehicle).Property(propertyInfo.Name).IsModified = true;
                }
            }
        }

        _context.SaveChanges();
        return true;
    }
    
    private static object GetDefault(Type type)
    {
        return type.IsValueType ? Activator.CreateInstance(type) : null;
    }

    public bool Delete(long vehicleId)
    {
        var vehicle = _context.Vehicles.Find(vehicleId);
        if (null == vehicle)
        {
            return false;
        }

        _context.Vehicles.Remove(vehicle);
        _context.SaveChanges();
        return true;
    }
}