using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JiraClone.Backend.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<Issue> Issues { get; set; } = new();
    }
}
