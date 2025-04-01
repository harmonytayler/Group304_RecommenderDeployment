using Microsoft.AspNetCore.Mvc;
using RecommendationAPI.Data;
using System.Collections.Generic;

namespace RecommendationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationsController : ControllerBase
    {
        // POST: api/recommendations/collaborative
        [HttpPost("collaborative")]
        public ActionResult<RecommendationResponse> GetCollaborativeRecommendations([FromBody] RecommendationRequest request)
        {
            // Call the Collaborative Filtering Model here (mocked for now)
            var recommendations = GetCollaborativeRecommendationsFromModel(request.UserId, request.ItemId);

            return Ok(new RecommendationResponse { Recommendations = recommendations });
        }

        // POST: api/recommendations/content
        [HttpPost("content")]
        public ActionResult<RecommendationResponse> GetContentRecommendations([FromBody] RecommendationRequest request)
        {
            // Call the Content Filtering Model here (mocked for now)
            var recommendations = GetContentRecommendationsFromModel(request.UserId, request.ItemId);

            return Ok(new RecommendationResponse { Recommendations = recommendations });
        }

        // POST: api/recommendations/azureML
        [HttpPost("azureML")]
        public ActionResult<RecommendationResponse> GetAzureMLRecommendations([FromBody] RecommendationRequest request)
        {
            // Call the Azure ML model here (mocked for now)
            var recommendations = GetAzureRecommendationsFromModel(request.UserId, request.ItemId);

            return Ok(new RecommendationResponse { Recommendations = recommendations });
        }

        // Mock methods for now (replace with actual model calls)
        private List<string> GetCollaborativeRecommendationsFromModel(string userId, string itemId)
        {
            // Replace with actual recommendation logic
            return new List<string> { "Item1", "Item2", "Item3", "Item4", "Item5" };
        }

        private List<string> GetContentRecommendationsFromModel(string userId, string itemId)
        {
            // Replace with actual recommendation logic
            return new List<string> { "Item6", "Item7", "Item8", "Item9", "Item10" };
        }

        private List<string> GetAzureRecommendationsFromModel(string userId, string itemId)
        {
            // Replace with actual Azure model call
            return new List<string> { "Item11", "Item12", "Item13", "Item14", "Item15" };
        }
    }
}
