using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarPriceComparison.API.Models;

public class User
{
    [Key]
    [Column("user_id")]
    public long UserId { get; set; }

    [Required]
    [Column("username")]
    public string Username { get; set; }

    [Column("password")]
    public string? Password { get; set; }

    [Column("email")]
    public string? Email { get; set; }

    [Column("mobile")]
    public string? Mobile { get; set; }

    [Column("status")]
    public byte? Status { get; set; }  

    [Column("create_user_id")]
    public long? CreateUserId { get; set; }

    [Column("create_time")]
    public DateTime? CreateTime { get; set; }

    [Column("update_time")]
    public DateTime? UpdateTime { get; set; }

}