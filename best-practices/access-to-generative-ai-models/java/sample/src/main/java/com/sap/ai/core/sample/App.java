package com.sap.ai.core.sample;

import java.util.ArrayList;
import java.util.Map;

import com.sap.ai.sdk.core.AiCoreService;
import com.sap.ai.sdk.core.client.ConfigurationApi;
import com.sap.ai.sdk.core.client.DeploymentApi;
import com.sap.ai.sdk.core.model.AiConfigurationBaseData;
import com.sap.ai.sdk.core.model.AiDeploymentCreationRequest;
import com.sap.ai.sdk.core.model.AiParameterArgumentBinding;
import com.sap.ai.sdk.orchestration.Message;
import com.sap.ai.sdk.orchestration.OrchestrationAiModel;
import com.sap.ai.sdk.orchestration.OrchestrationClient;
import com.sap.ai.sdk.orchestration.OrchestrationModuleConfig;
import com.sap.ai.sdk.orchestration.OrchestrationPrompt;


public class App {
    public static void main(String[] args) {
        // Define the resource group, change this to your resource group name
        var RESOURCE_GROUP = "default";

        // Define parameter and input artifact bindings you may need for orchestration
        var modelFilterList = AiParameterArgumentBinding.create()
                .key("modelFilterList")
                .value("null");
        var modelFilterListType = AiParameterArgumentBinding.create()
                .key("modelFilterListType")
                .value("allow");

        // Create a configuration data object for your configuration
        var configurationData = AiConfigurationBaseData.create()
                .name("orchestration-config") // Choose a meaningful name
                .executableId("orchestration") // Orchestration executable ID
                .scenarioId("orchestration") // Orchestration scenario ID
                .addParameterBindingsItem(modelFilterList)
                .addParameterBindingsItem(modelFilterListType);

        // Create the configuration with your individual resource group
        var configuration = new ConfigurationApi().create(RESOURCE_GROUP, configurationData);

        // Print the configuration response message
        System.out.println(configuration.getMessage());
        var deploymentCreationRequest =
            AiDeploymentCreationRequest.create()
                    .configurationId(configuration.getId());

        // Create the deployment with the deployment creation request
        var deployment = new DeploymentApi().create(RESOURCE_GROUP, deploymentCreationRequest);

        // Print the deployment response message
        System.out.println(deployment.getMessage());

        var userMessage = Message.user("What is the capital of France?");

        Message systemMessage = Message.user("You are a helpful bot");
        // Define the prompt for resume screening
        var prompt = new OrchestrationPrompt(systemMessage, userMessage);
        // List of models with parameters to iterate through, can be adapted if desired
        var model = OrchestrationAiModel.GPT_4O.withParam("temperature", 0.6);
        // Create the client used for interaction with orchestration service
        var client = new OrchestrationClient(new AiCoreService()
                .getInferenceDestination(RESOURCE_GROUP)
                .forScenario("orchestration"));

        // Create orchestration module configuration
        var moduleConfig = new OrchestrationModuleConfig();

        // A list to store all responses from the different models
        var responses = new ArrayList<Map>();

        // Iterate through the list of models

        System.out.println("\n=== Responses for model: %s ===\n".formatted(model.getName()));

        // Prompt LLM with specific LLM config for model
        var response = client.chatCompletion(prompt, moduleConfig.withLlmConfig(model));

        System.out.println(response.getContent());

    }
}
