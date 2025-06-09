package com.sap.ai.core.sample.rag;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import dev.langchain4j.data.document.Document;
import dev.langchain4j.data.document.loader.FileSystemDocumentLoader;
import dev.langchain4j.data.document.splitter.DocumentSplitters;
import dev.langchain4j.data.embedding.Embedding;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.embedding.AllMiniLmL6V2EmbeddingModel;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.store.embedding.EmbeddingMatch;
import dev.langchain4j.store.embedding.EmbeddingSearchRequest;
import dev.langchain4j.store.embedding.EmbeddingStoreIngestor;
import dev.langchain4j.store.embedding.inmemory.InMemoryEmbeddingStore;
import com.sap.ai.sdk.core.AiCoreService;
import com.sap.ai.sdk.core.client.ConfigurationApi;
import com.sap.ai.sdk.core.client.DeploymentApi;
import com.sap.ai.sdk.core.model.AiConfigurationBaseData;
import com.sap.ai.sdk.core.model.AiConfigurationCreationResponse;
import com.sap.ai.sdk.core.model.AiDeploymentCreationRequest;
import com.sap.ai.sdk.core.model.AiDeploymentCreationResponse;
import com.sap.ai.sdk.orchestration.Message;
import com.sap.ai.sdk.orchestration.OrchestrationAiModel;
import com.sap.ai.sdk.orchestration.OrchestrationChatResponse;
import com.sap.ai.sdk.orchestration.OrchestrationClient;
import com.sap.ai.sdk.orchestration.OrchestrationModuleConfig;
import com.sap.ai.sdk.orchestration.OrchestrationPrompt;
import com.sap.ai.sdk.orchestration.UserMessage;


public class App {

    public static void main(String[] args) {
        
        List<Document> documents = FileSystemDocumentLoader.loadDocuments("resources");
        InMemoryEmbeddingStore<TextSegment> embeddingStore = new InMemoryEmbeddingStore<>();
        EmbeddingModel embeddingModel = new AllMiniLmL6V2EmbeddingModel();
        EmbeddingStoreIngestor ingestor = EmbeddingStoreIngestor.builder()
                .documentSplitter(DocumentSplitters.recursive(1000, 200))
                .embeddingModel(embeddingModel)
                .embeddingStore(embeddingStore)
                .build();
        ingestor.ingest(documents);
        Embedding queryEmbedding = embeddingModel.embed("What is the weather today?").content();
        EmbeddingSearchRequest embeddingSearchRequest = EmbeddingSearchRequest.builder()
                .queryEmbedding(queryEmbedding)
                .maxResults(1)
                .build();
        List<EmbeddingMatch<TextSegment>> matches = embeddingStore.search(embeddingSearchRequest).matches();
        EmbeddingMatch<TextSegment> embeddingMatch = matches.get(0);

        String queryResult = embeddingMatch.embedded().text();
        
        System.out.println(embeddingMatch.score());
        System.out.println(queryResult);
        
        
        // Define the resource group, change this to your resource group name
        String RESOURCE_GROUP = "default";

        // Define parameter and input artifact bindings you may need for orchestration


        // Create a configuration data object for your configuration
        AiConfigurationBaseData configurationData = AiConfigurationBaseData.create()
                .name("orchestration-config") // Choose a meaningful name
                .executableId("orchestration") // Orchestration executable ID
                .scenarioId("orchestration"); // Orchestration scenario ID

        // Create the configuration with your individual resource group
        AiConfigurationCreationResponse configuration = new ConfigurationApi().create(RESOURCE_GROUP, configurationData);

        // Print the configuration response message
        System.out.println(configuration.getMessage());
        AiDeploymentCreationRequest deploymentCreationRequest =
            AiDeploymentCreationRequest.create()
                    .configurationId(configuration.getId());

        // Create the deployment with the deployment creation request
        AiDeploymentCreationResponse deployment = new DeploymentApi().create(RESOURCE_GROUP, deploymentCreationRequest);

        // Print the deployment response message
        String testMessage = "What is the AI Core";
        System.out.println(deployment.getMessage());
        UserMessage userMessage = Message.user(testMessage);
        Message systemMessage = Message.system(String.format("You are a helpful bot, use the following information %s to answer the user query: %s",queryResult, testMessage));
        
        // Define the prompt for resume screening
        OrchestrationPrompt prompt = new OrchestrationPrompt(systemMessage, userMessage);
        
        // List of models with parameters to iterate through, can be adapted if desired
        OrchestrationAiModel model = OrchestrationAiModel.GPT_4O.withParam("temperature", 0.6);
        
        // Create the client used for interaction with orchestration service
        OrchestrationClient client = new OrchestrationClient(new AiCoreService()
                .getInferenceDestination(RESOURCE_GROUP)
                .forScenario("orchestration"));

        // Create orchestration module configuration
        OrchestrationModuleConfig moduleConfig = new OrchestrationModuleConfig();

        // Prompt LLM with specific LLM config for model
        OrchestrationChatResponse response = client.chatCompletion(prompt, moduleConfig.withLlmConfig(model));

        System.out.println(response.getContent());



    }
}
