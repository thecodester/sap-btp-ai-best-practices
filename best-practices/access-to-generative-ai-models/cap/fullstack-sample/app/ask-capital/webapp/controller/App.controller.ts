/* eslint-disable @typescript-eslint/no-unsafe-call */
import Input from "sap/m/Input";
import MessageBox from "sap/m/MessageBox";
import Controller from "sap/ui/core/mvc/Controller";
import ODataContextBinding from "sap/ui/model/odata/v4/ODataContextBinding";
import AppComponent from "../Component";

/**
 * @namespace ui5.typescript.helloworld.controller
 */
export default class App extends Controller {
	public onInit(): void {
		// apply content density mode to root view
		const oView = this.getView();
		if (oView) {
			oView.addStyleClass(
				(this.getOwnerComponent() as AppComponent).getContentDensityClass()
			);
		}
	}

	public async onSubmit() {
		const oView = this.getView()!;

		const oModel = oView.getModel();
		const oActionODataContextBinding = oModel?.bindContext(
			"/askCapitalOfCountry(...)"
		) as ODataContextBinding;

		const oInputCountry = oView.byId("inputCountry") as Input;

		oActionODataContextBinding.setParameter(
			"country",
			oInputCountry.getValue()
		);
		await oActionODataContextBinding.execute();
		const oActionContext = oActionODataContextBinding.getBoundContext();

		MessageBox.show(oActionContext.getObject().value);
	}
}
