using AutoMapper;
using CarPriceComparison.API.Data;
using CarPriceComparison.API.Models;
using CarPriceComparison.API.Models.DTO;
using CarPriceComparison.API.Services.Interface;

namespace CarPriceComparison.API.Services;

public class VehicleService : IVehicleService
{
    
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public VehicleService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
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

    public bool Add(VehicleCreateDto vehicleDto)
    {
        var vehicle = _mapper.Map<Vehicle>(vehicleDto);
        vehicle.ScrapedDate = DateTime.Now;
        vehicle.CreateTime = DateTime.Now;
        vehicle.UpdateTime = DateTime.Now;
        
        _context.Vehicles.Add(vehicle);
        _context.SaveChanges();
        return true;
    }

    public bool Update(VehicleUpdateDto vehicleDto)
    {
        var existVehicle = _context.Vehicles.Find(vehicleDto.VehicleId);
        if (null == existVehicle)
        {
            return false;
        }
        
        _mapper.Map(vehicleDto, existVehicle);
        existVehicle.UpdateTime = DateTime.Now;
        _context.Vehicles.Update(existVehicle);

        _context.SaveChanges();
        return true;
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