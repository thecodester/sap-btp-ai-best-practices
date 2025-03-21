/* eslint-disable @typescript-eslint/no-unsafe-call */
import Input from 'sap/m/Input';
import MessageBox from 'sap/m/MessageBox';
import Controller from 'sap/ui/core/mvc/Controller';
import ODataContextBinding from 'sap/ui/model/odata/v4/ODataContextBinding';
import AppComponent from '../Component';

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
		try {
			const oView = this.getView()!;
			const oModel = oView.getModel();
			const sCountry = (oView.byId('inputCountry') as Input).getValue();

			// Create and execute the OData action
			const oBinding = oModel?.bindContext(
				'/askCapitalOfCountry(...)'
			) as ODataContextBinding;
			oBinding.setParameter('country', sCountry);
			await oBinding.invoke();

			// Show result
			const oResult = oBinding.getBoundContext().getObject();
			MessageBox.show(`The capital of ${sCountry} is ${oResult.value}`);
		} catch (error) {
			console.log(error);
			MessageBox.error('Could not retrieve capital information');
		}
	}
}
