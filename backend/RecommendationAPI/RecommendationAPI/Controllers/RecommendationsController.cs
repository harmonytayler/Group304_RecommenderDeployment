using Microsoft.AspNetCore.Mvc;
using RecommendationAPI.Data;
using System.Collections.Generic;
using System.Diagnostics;
using Newtonsoft.Json; // For JSON deserialization

namespace RecommendationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationsController : ControllerBase
    {
        [HttpGet("content/{itemId}")]
        public IActionResult GetContentData(string itemId)
        {
            string filePath = "../RecommendationAPI/all_recommendations_5cols.csv";

            try
            {
                var lines = System.IO.File.ReadAllLines(filePath);
                foreach (var line in lines)
                {
                    var columns = line.Split(',');
                    if (columns.Length > 5 && columns[0] == itemId)
                    {
                        var result = columns.Skip(1).Take(5).ToList();
                        return Ok(result);
                    }
                }
                return NotFound($"Item with ID {itemId} not found.");
            }
            catch (IOException ex)
            {
                return StatusCode(500, $"Error reading file: {ex.Message}");
            }
        }

        [HttpGet("collaborative/{itemId}")]
        public IActionResult GetCollaborativeData(string itemId)
        {
            string filePath = "../RecommendationAPI/recommendationId.csv";

            try
            {
                var lines = System.IO.File.ReadAllLines(filePath);
                foreach (var line in lines)
                {
                    var columns = line.Split(',');
                    if (columns.Length > 5 && columns[0] == itemId)
                    {
                        var result = columns.Skip(2).Take(5).ToList();
                        return Ok(result);
                    }
                }
                return NotFound($"Item with ID {itemId} not found.");
            }
            catch (IOException ex)
            {
                return StatusCode(500, $"Error reading file: {ex.Message}");
            }
        }

        [HttpGet("azure/{userId}/{itemId}")]
        public IActionResult GetAzureData(string userId, string itemId)
        {
            var result = userId;
            return Ok(result);
        }
    }
}
