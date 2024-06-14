using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarPriceComparison.API.Models;

public class Dealer
{
    [Key]
    [Column("dealer_id")]
    public long DealerId { get; set; }

    [Required]
    [Column("name")]
    public string Name { get; set; }

    [Column("address")]
    public string? Address { get; set; }

    [Column("city")]
    public string? City { get; set; }

    [Column("state")]
    public string? State { get; set; }

    [Column("zip_code")]
    public string? ZipCode { get; set; }

    [Column("country")]
    public string? Country { get; set; }

    [Column("phone")]
    public string? Phone { get; set; }

    [Column("email")]
    public string? Email { get; set; }

    [Column("website")]
    public string? Website { get; set; }
    
    [Column("status")]
    public byte? Status { get; set; }  

    [Column("create_time")]
    public DateTime? CreateTime { get; set; }

    [Column("update_time")]
    public DateTime? UpdateTime { get; set; }
}