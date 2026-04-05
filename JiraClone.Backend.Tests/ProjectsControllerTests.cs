using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JiraClone.Backend.Controllers;
using JiraClone.Backend.Data;
using JiraClone.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace JiraClone.Backend.Tests
{
    public class ProjectsControllerTests
    {
        private JiraCloneDbContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<JiraCloneDbContext>()
                .UseInMemoryDatabase(databaseName: System.Guid.NewGuid().ToString())
                .Options;
            var context = new JiraCloneDbContext(options);
            context.Database.EnsureCreated();
            return context;
        }

        [Fact]
        public async Task GetProjects_ReturnsAllProjects()
        {
            // Arrange
            var context = GetDbContext();
            context.Projects.Add(new Project { Name = "Test Project 1" });
            context.Projects.Add(new Project { Name = "Test Project 2" });
            await context.SaveChangesAsync();
            var controller = new ProjectsController(context);

            // Act
            var result = await controller.GetProjects();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Project>>>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<Project>>(actionResult.Value);
            Assert.Equal(2, model.Count());
        }

        [Fact]
        public async Task PostProject_CreatesNewProject()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new ProjectsController(context);
            var newProject = new Project { Name = "New Project" };

            // Act
            var result = await controller.PostProject(newProject);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Project>>(result);
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
            var returnValue = Assert.IsType<Project>(createdAtActionResult.Value);
            
            Assert.Equal("New Project", returnValue.Name);
            Assert.Single(context.Projects);
        }
    }
}
