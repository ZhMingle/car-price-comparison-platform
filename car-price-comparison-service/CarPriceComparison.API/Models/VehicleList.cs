namespace CarPriceComparison.API.Models;

public class VehicleList
{
    public VehicleList(int totalRecords, IEnumerable<Vehicle> vehicles)
    {
        Total = totalRecords;
        Vehicles = vehicles;
    }
    
    public int Total { get; set; }

    public IEnumerable<Vehicle> Vehicles { get; set; }
    
}