
namespace CarPriceComparison.API.Models.DTO;

public class UserUpdateDto
{
    public long UserId { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? Email { get; set; }
    public string? Mobile { get; set; }
    public byte? Status { get; set; }  
    
}