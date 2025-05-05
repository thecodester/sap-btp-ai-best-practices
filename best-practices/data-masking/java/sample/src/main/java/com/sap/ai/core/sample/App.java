package com.sap.ai.core.sample;

import com.sap.ai.sdk.orchestration.DpiMasking;
import com.sap.ai.sdk.orchestration.Message;
import com.sap.ai.sdk.orchestration.OrchestrationAiModel;
import com.sap.ai.sdk.orchestration.OrchestrationClient;
import com.sap.ai.sdk.orchestration.OrchestrationModuleConfig;
import com.sap.ai.sdk.orchestration.OrchestrationPrompt;
import com.sap.ai.sdk.orchestration.model.DPIEntities;


public class App {
    public static void main(String[] args) {

  
        var config = new OrchestrationModuleConfig()
                .withLlmConfig(OrchestrationAiModel.CLAUDE_3_5_SONNET);
        var maskingConfig =
                DpiMasking.anonymization().withEntities(DPIEntities.PHONE, DPIEntities.PERSON);
            var configWithMasking = config.withMaskingConfig(maskingConfig);

            var systemMessage = Message.system("Please evaluate the following user feedback and judge if the sentiment is positive or negative.");
            var userMessage = Message.user("""
                             I think the SAP AI SDK is good, but could use some further enhancements.
                             My architect Alice and manager Bob pointed out that we need the grounding capabilities, which aren't supported yet.
                             """);

            var prompt = new OrchestrationPrompt(systemMessage, userMessage);

            var result =
                new OrchestrationClient().chatCompletion(prompt, configWithMasking);
            System.out.print(result);

    }
}
