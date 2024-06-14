
namespace CarPriceComparison.API.Models.DTO;

public class VehicleUpdateDto
{
    public long VehicleId { get; set; }
    public string Brand { get; set; }
    public string Model { get; set; }
    public int Year { get; set; }
    public int? Mileage { get; set; }
    public string? BodyType { get; set; }
    public string? Color { get; set; }
    public decimal CurrentPrice { get; set; }
    public string? Location { get; set; }
    public byte? Status { get; set; }  
    public string? Source { get; set; }
}