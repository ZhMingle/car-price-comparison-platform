using System.ComponentModel.DataAnnotations.Schema;

namespace CarPriceComparison.API.Models;

public class User
{
    public User(int userId, string username)
    {
        UserId = userId;
        Username = username;
    }
    
    [Column("user_id")]
    public int UserId { get; set; }

    [Column("username")]
    public string? Username { get; set; }

}