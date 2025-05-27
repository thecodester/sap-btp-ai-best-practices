package com.sap.ai.core.sample;

import java.util.List;
import java.util.Map;

import com.sap.ai.sdk.orchestration.Message;
import com.sap.ai.sdk.orchestration.OrchestrationAiModel;
import com.sap.ai.sdk.orchestration.OrchestrationClient;
import com.sap.ai.sdk.orchestration.OrchestrationModuleConfig;
import com.sap.ai.sdk.orchestration.OrchestrationPrompt;
import com.sap.ai.sdk.orchestration.TemplateConfig;

public class App {
    public static void main(String[] args) {
        var client = new OrchestrationClient();

        var config = new OrchestrationModuleConfig()
                .withLlmConfig(OrchestrationAiModel.CLAUDE_3_5_SONNET);
        var template = Message.user("Reply with 'Orchestration Service is working!' in {{?language}}");
        var templatingConfig =
            TemplateConfig.create()
                    .withTemplate(List.of(template.createChatMessage()));
        var configWithTemplate = config.withTemplateConfig(templatingConfig);

        var inputParams = Map.of("language", "German");
        var prompt = new OrchestrationPrompt(inputParams);

        var result = client.chatCompletion(prompt, configWithTemplate);
        System.out.print(result);
    }
}
