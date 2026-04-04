using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JiraClone.Backend.Models
{
    public class Issue
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ProjectId { get; set; }
        
        [ForeignKey("ProjectId")]
        public Project? Project { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Required]
        public string Type { get; set; } = "Task"; // Task, Bug, Story

        [Required]
        public string Status { get; set; } = "Backlog"; // Backlog, InProgress, Review, Done

        [Required]
        public string Priority { get; set; } = "Medium"; // Low, Medium, High

        public int? AssigneeId { get; set; }
        
        [ForeignKey("AssigneeId")]
        public User? Assignee { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
