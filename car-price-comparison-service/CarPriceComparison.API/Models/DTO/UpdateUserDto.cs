using System.ComponentModel.DataAnnotations.Schema;

namespace CarPriceComparison.API.Models.DTO;

public class UpdateUserDto
{
    [Column("username")]
    public string? Username { get; set; }
}