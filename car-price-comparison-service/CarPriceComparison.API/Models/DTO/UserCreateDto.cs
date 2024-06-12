
namespace CarPriceComparison.API.Models;

public class UserCreateDto
{
    public string Username { get; set; }

    public string? Password { get; set; }

    public string? Email { get; set; }

    public string? Mobile { get; set; }

    public byte? Status { get; set; }  
}