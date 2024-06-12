using System.ComponentModel.DataAnnotations.Schema;

namespace CarPriceComparison.API.Models.DTO;

public class UpdateUserDto
{
    [Column("username")]
    public string? Username { get; set; }
    
    [Column("password")]
    public string? Password { get; set; }

    [Column("email")]
    public string? Email { get; set; }

    [Column("mobile")]
    public string? Mobile { get; set; }

    [Column("status")]
    public byte? Status { get; set; }  

    [Column("update_time")]
    public DateTime? UpdateTime { get; set; }
}