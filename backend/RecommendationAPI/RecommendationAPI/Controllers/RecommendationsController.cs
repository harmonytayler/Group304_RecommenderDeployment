using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace RecommendationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationsController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string AzureMLEndpointUrl;
        private readonly string ApiKey;

        public RecommendationsController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            AzureMLEndpointUrl = configuration["AzureML:Endpoint"];
            ApiKey = configuration["AzureML:ApiKey"];
        }

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

        [HttpGet("azure/{itemId}")]
        public async Task<IActionResult> GetAzureData(string itemId)
        {
            try
            {
                var inputPayload = new
                {
                    contentId = itemId
                };

                var jsonContent = JsonConvert.SerializeObject(inputPayload);

                var client = _httpClientFactory.CreateClient();
                var request = new HttpRequestMessage(HttpMethod.Post, AzureMLEndpointUrl)
                {
                    Content = new StringContent(jsonContent, Encoding.UTF8, "application/json")
                };

                // Add the Authorization header to the request
                request.Headers.Add("Authorization", "Bearer " + ApiKey);

                var response = await client.SendAsync(request);

                if (response.IsSuccessStatusCode)
                {
                    var responseData = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<object>(responseData);  // Adjust based on your response format
                    return Ok(result);
                }
                else
                {
                    return StatusCode((int)response.StatusCode, "Error calling Azure ML service");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error calling Azure ML service: {ex.Message}");
            }
        }
    }
}
