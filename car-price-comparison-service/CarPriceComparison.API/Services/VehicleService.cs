using AutoMapper;
using CarPriceComparison.API.Data;
using CarPriceComparison.API.Models;
using CarPriceComparison.API.Models.Base;
using CarPriceComparison.API.Models.DTO;
using CarPriceComparison.API.Services.Interface;
using Microsoft.EntityFrameworkCore;

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
        var vehicles = _context.Vehicles.Where(v => v.Status == Constants.VehicleStatus.Normal).OrderBy(v => v.VehicleId)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        return new VehicleList(totalRecords, vehicles);
    }

    public Vehicle GetById(long vehicleId)
    {
        return _context.Vehicles
            .Where(v => v.VehicleId == vehicleId && v.Status == Constants.VehicleStatus.Normal)
            .FirstOrDefault();
    }

    public bool Add(VehicleCreateDto vehicleDto)
    {
        var vehicle = _mapper.Map<Vehicle>(vehicleDto);
        vehicle.Status = Constants.VehicleStatus.Normal;
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

    public bool UpdateStatusByVDealerId(long dealerId)
    {
        // 生成SQL语句
        // 生成SQL语句
        string sql = "UPDATE auto_vehicle SET status = {0}, update_time = {2} WHERE dealer_id = {1}";
        
        // 执行SQL命令
        _context.Database.ExecuteSqlRaw(sql, Constants.VehicleStatus.Disable, dealerId, DateTime.Now);
        return true;
    }

    public bool Delete(long vehicleId)
    {
        var vehicle = _context.Vehicles.Find(vehicleId);
        if (null == vehicle)
        {
            return false;
        }

        // logical delete
        vehicle.Status = Constants.VehicleStatus.Disable;
        _context.Vehicles.Update(vehicle);
        _context.SaveChanges();
        return true;
    }
}