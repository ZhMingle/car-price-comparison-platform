using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarPriceComparison.API.Models.DTO;

public class UpdateVehicleDto
{

    [Column("brand")]
    public string Brand { get; set; }

    [Column("model")]
    public string Model { get; set; }

    [Column("year")]
    public int Year { get; set; }

    [Column("mileage")]
    public int? Mileage { get; set; }

    [Column("body_type")]
    public string? BodyType { get; set; }

    [Column("color")]
    public string? Color { get; set; }

    [Required]
    [Column("current_price")]
    public decimal CurrentPrice { get; set; }

    [Column("location")]
    public string? Location { get; set; }

    [Column("dealer_id")]
    public long? DealerId { get; set; }

    [Column("listing_date")]
    public DateTime? ListingDate { get; set; }

    [Column("source")]
    public string? Source { get; set; }

    [Column("listing_url")]
    public string? ListingUrl { get; set; }

    [Column("update_time")]
    public DateTime? UpdateTime { get; set; }
}