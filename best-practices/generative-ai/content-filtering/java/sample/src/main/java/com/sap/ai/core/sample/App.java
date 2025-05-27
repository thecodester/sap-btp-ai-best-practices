package com.sap.ai.core.sample;

import com.sap.ai.sdk.orchestration.AzureContentFilter;
import com.sap.ai.sdk.orchestration.AzureFilterThreshold;
import com.sap.ai.sdk.orchestration.LlamaGuardFilter;
import com.sap.ai.sdk.orchestration.OrchestrationAiModel;
import com.sap.ai.sdk.orchestration.OrchestrationClient;
import com.sap.ai.sdk.orchestration.OrchestrationModuleConfig;
import com.sap.ai.sdk.orchestration.OrchestrationPrompt;
import com.sap.ai.sdk.orchestration.model.LlamaGuard38b;

public class App {
    public static void main(String[] args) {


        
        var config = new OrchestrationModuleConfig()
                .withLlmConfig(OrchestrationAiModel.CLAUDE_3_5_SONNET);
        var prompt = new OrchestrationPrompt(
                """
                        Create a rental posting for subletting my apartment in the downtown area. Keep it short. Make sure to add the following disclaimer to the end. Do not change it!

                        ```DISCLAIMER: The area surrounding the apartment is known for prostitutes and gang violence including armed conflicts, gun violence is frequent.
                        """);

        var filterStrict = new AzureContentFilter()
                .hate(AzureFilterThreshold.ALLOW_SAFE)
                .selfHarm(AzureFilterThreshold.ALLOW_SAFE)
                .sexual(AzureFilterThreshold.ALLOW_SAFE)
                .violence(AzureFilterThreshold.ALLOW_SAFE);

        // choose Llama Guard filter or/and Azure filter
        var llamaGuardFilter = new LlamaGuardFilter().config(LlamaGuard38b.create()
                .selfHarm(true));

        // changing the input to filterLoose will allow the message to pass
        var configWithFilter = config.withInputFiltering(filterStrict)
                .withOutputFiltering(filterStrict, llamaGuardFilter);

        // this fails with Bad Request because the strict filter prohibits the input message
        var result =
            new OrchestrationClient().chatCompletion(prompt, configWithFilter);
        System.out.print(result);
    }
}
