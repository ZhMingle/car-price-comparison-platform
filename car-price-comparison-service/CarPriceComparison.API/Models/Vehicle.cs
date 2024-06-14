using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarPriceComparison.API.Models;

public class Vehicle
{
    [Key]
    [Column("vehicle_id")]
    public long VehicleId { get; set; }

    [Required]
    [Column("brand")]
    public string Brand { get; set; }

    [Required]
    [Column("model")]
    public string Model { get; set; }

    [Required]
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
    
    [Column("status")]
    public byte? Status { get; set; }  

    [Column("source")]
    public string? Source { get; set; }

    [Column("scraped_date")]
    public DateTime? ScrapedDate { get; set; }

    [Column("listing_url")]
    public string? ListingUrl { get; set; }

    [Column("create_user_id")]
    public long? CreateUserId { get; set; }

    [Column("create_time")]
    public DateTime? CreateTime { get; set; }

    [Column("update_time")]
    public DateTime? UpdateTime { get; set; }
}