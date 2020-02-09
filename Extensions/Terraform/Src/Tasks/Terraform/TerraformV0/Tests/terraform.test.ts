
import { Terraform } from '../src/terraform'
import * as Backend from "../src/backend/backends"
import * as Provider from "../src/provider/providers"
import tasks = require('azure-pipelines-task-lib/task');

import { expect, assert } from 'chai';
var sinon = require('sinon');
import rewiremock from 'rewiremock';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import 'mocha';

let providers = ["azurerm", "aws", "google"];
let backends = ["local", "remote", "azurerm", "s3", "gcs"];

describe('Terraform Test Suite', () => {

    describe('Testing main Terraform class with different backends and providers', () => {

        beforeEach(function () {
            console.log('-----')
        });

        before(function () {
            describe('Testing if Terraform is installed', () => {
                let provider: Provider.Base;
                let backend: Backend.Base;
                it("Terraform is available", () => {
                    let terraform = terraformClassInit(provider, backend, 'base', 'local');
                    var terraform_check = terraform.getToolRunner();
                    var terraform_path = terraform_check["toolPath"];
                    if (terraform_path != '') { assert.ok(true) }
                })
            })
        })

        providers.forEach(provider_string => {
            let provider: Provider.Base;
            switch (provider_string) {
                case "azurerm": provider: Provider.AzureRM; break;
                case "aws": provider: Provider.AWS; break;
                case "google": provider: Provider.Google; break;
            }

            backends.forEach(backend_string => {
                let backend: Backend.Base;
                switch (backend_string) {
                    case "local": backend: Backend.Local; break;
                    case "remote": backend: Backend.Remote; break;
                    case "azurerm": backend: Backend.AzureRM; break;
                    case "s3": backend: Backend.S3; break;
                    case "gcs": backend: Backend.GCS; break;
                }
                it(('Testing main Terraform class with provider: ' + provider_string + 'and backend: ' + backend_string), () => {
                    let terraform = terraformClassInit(provider, backend, provider_string, backend_string);
                    describe('Testing terraform commands', () => {
                        runInitTests(terraform);

                        runValidateTests(terraform);

                        runPlanTests(terraform);

                        runApplyTests(terraform);

                        runDestroyTests(terraform);
                    });
                });
            });
        });
    });

    function terraformClassInit(provider, backend, provider_string, backend_string) {

        let backendInput = rewiremock('azure-pipelines-task-lib')
            .with({
                'getInput': sinon.stub().callsFake((i: string | number) => { return backend_string || null; }),
            });
        let providerInput = rewiremock('azure-pipelines-task-lib')
            .with({
                'getInput': sinon.stub().callsFake((i: string | number) => { return provider_string || null; }),
            });

        backendInput.enable();
        providerInput.enable();

        let terraform: Terraform = new Terraform(backend, provider);
        // console.log(terraform.getToolRunner());
        // console.log(expect(terraform));
        expect(terraform);
        return (terraform);
        backendInput.disable();
        providerInput.disable();

    }

    function runInitTests(terraform) {
        it('Terraform init test ', async () => {
            let output = await terraform.init();
            expect(output).to.equal(1);
        })

    }
    function runValidateTests(terraform) {
        it('Terraform validate test ', async () => {
            let output = await terraform.validate();
            expect(output).to.equal(1);
        })
    }
    function runPlanTests(terraform) {
        it('Terraform plan test ', async () => {
            let output = await terraform.plan();
            expect(output).to.equal(1);
        })
    }
    function runApplyTests(terraform) {
        it('Terraform apply test ', async () => {
            let output = await terraform.apply();
            expect(output).to.equal(1);
        })
    }
    function runDestroyTests(terraform) {
        it('Terraform destroy test ', async () => {
            let output = await terraform.destroy();
            expect(output).to.equal(1);
        })
    }
    // function runCompareVesrsionsTests() { }
});




// describe('Terraform Test Suite', () => {

//     before(() => { });

//     after(() => { });

//     const initMessages = [
//         'AzureInitSuccessNoAdditionalArgsL0 should have succeeded.',
//         'AzureInitSuccessAdditionalArgsL0 should have succeeded.',
//         'AzureInitSuccessEmptyWorkingDirL0 should have succeeded.',
//         'AWSInitSuccessNoAdditionalArgsL0 should have succeeded.',
//         'AWSInitSuccessAdditionalArgsL0 should have succeeded.',
//         'AWSInitSuccessEmptyWorkingDirL0 should have succeeded.',
//         'GCPInitSuccessNoAdditionalArgsL0 should have succeeded.',
//         'GCPInitSuccessAdditionalArgsL0 should have succeeded.',
//         'GCPInitSuccessEmptyWorkingDirL0 should have succeeded.',
//         'AzureValidateSuccessNoAdditionalArgsL0 should have succeeded.',
//         'AzureValidateSuccessAdditionalArgsL0 should have succeeded.',
//         'AzureValidateSuccessEmptyWorkingDirL0 should have succeeded.',
//         'AWSValidateSuccessNoAdditionalArgsL0 should have succeeded.',
//         'AWSValidateSuccessAdditionalArgsL0 should have succeeded.',
//         'AWSValidateSuccessEmptyWorkingDirL0 should have succeeded.',
//         'GCPValidateSuccessNoAdditionalArgsL0 should have succeeded.',
//         'GCPValidateSuccessAdditionalArgsL0 should have succeeded.',
//         'GCPValidateSuccessEmptyWorkingDirL0 should have succeeded.',
//     ];

//     const initFailMessages = [
//         'There are some problems with the configuration, described below.\n\nThe Terraform configuration must be valid before initialization so that Terraform can determine which modules and providers need to be installed.',
//         'Execution failed: invalid config files',
//     ];

//     const planSuccessMessages = [
//         'AzurePlanSuccessNoAdditionalArgsL0 should have succeeded.',
//         'AzurePlanSuccessAdditionalArgsL0 should have succeeded.',
//         'AWSPlanSuccessNoAdditionalArgsL0 should have succeeded.',
//         'AWSPlanSuccessAdditionalArgsL0 should have succeeded.',
//         'GCPPlanSuccessNoAdditionalArgsL0 should have succeeded.',
//         'GCPPlanSuccessAdditionalArgsL0 should have succeeded.',
//         'AzureDestroySuccessNoAdditionalArgsL0 should have succeeded.',
//         'AzureDestroySuccessAdditionalArgsWithAutoApproveL0 should have succeeded.',
//         'AzureDestroySuccessAdditionalArgsWithoutAutoApproveL0 should have succeeded.',
//         'AWSDestroySuccessNoAdditionalArgsL0 should have succeeded.',
//         'AWSDestroySuccessAdditionalArgsWithAutoApproveL0 should have succeeded.',
//         'AWSDestroySuccessAdditionalArgsWithoutAutoApproveL0 should have succeeded.',
//         'AWSDestroySuccessNoAdditionalArgsL0 should have succeeded.',
//         'AWSDestroySuccessAdditionalArgsWithAutoApproveL0 should have succeeded.',
//         'AWSDestroySuccessAdditionalArgsWithoutAutoApproveL0 should have succeeded.',
//         'GCPDestroySuccessNoAdditionalArgsL0 should have succeeded.',
//         'GCPDestroySuccessAdditionalArgsWithAutoApproveL0 should have succeeded.',
//         'GCPDestroySuccessAdditionalArgsWithoutAutoApproveL0 should have succeeded.'
//     ];

//     const invalidConfigFilesMessage = 'Execution failed: invalid config files';

//     const applySuccessParametersMessages = [
//         'AzureApplySuccessNoAdditionalArgsL0 should have succeeded.',
//         'AzureApplySuccessAdditionalArgsWithAutoApproveL0 should have succeeded.',
//         'AzureApplySuccessAdditionalArgsWithoutAutoApproveL0 should have succeeded.',
//         'AWSApplySuccessNoAdditionalArgsL0 should have succeeded.',
//         'AWSApplySuccessAdditionalArgsWithAutoApproveL0 should have succeeded.',
//         'AWSApplySuccessAdditionalArgsWithoutAutoApproveL0 should have succeeded.',
//         'GCPApplySuccessNoAdditionalArgsL0 should have succeeded.',
//         'GCPApplySuccessAdditionalArgsWithAutoApproveL0 should have succeeded.',
//         'GCPApplySuccessAdditionalArgsWithoutAutoApproveL0 should have succeeded.'
//     ];

//     /********************************************/
//     /*          terraform init tests            */
//     /********************************************/

//     it('azure init should succeed with no additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './InitTests/InitSuccessNoAdditionalArgs.ts');
//         providerInit(tp, done, initMessages[0]);
//     });

//     it('azure init should succeed with additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './InitTests/InitSuccessAdditionalArgs.ts');
//         providerInit(tp, done, initMessages[1]);
//     });

//     it('azure init should succeed with empty working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './InitTests/InitSuccessEmptyWorkingDir.ts');
//         providerInit(tp, done, initMessages[2]);
//     });

//     it('azure init should fail with invalid working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './InitTests/InitFailInvalidWorkingDirectory.ts');
//         providerInitFail(tp, done, initFailMessages[0]);
//     });

//     it('aws init should succeed with no additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './InitTests/InitSuccessNoAdditionalArgs.ts');
//         providerInit(tp, done, initMessages[3]);
//     });

//     it('aws init should succeed with additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './InitTests/InitSuccessAdditionalArgs.ts');
//         providerInit(tp, done, initMessages[4]);
//     });

//     it('aws init should succeed with empty working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './InitTests/InitSuccessEmptyWorkingDir.ts');
//         providerInit(tp, done, initMessages[5]);
//     });

//     it('aws init should fail with invalid working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './InitTests/InitFailInvalidWorkingDirectory.ts');
//         providerInitFail(tp, done, initFailMessages[0]);
//     });

//     it('gcp init should succeed with no additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './InitTests/InitSuccessNoAdditionalArgs.ts');
//         providerInit(tp, done, initMessages[6]);
//     });

//     it('gcp init should succeed with additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './InitTests/InitSuccessAdditionalArgs.ts');
//         providerInit(tp, done, initMessages[7]);
//     });

//     it('gcp init should succeed with empty working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './InitTests/InitSuccessEmptyWorkingDir.ts');
//         providerInit(tp, done, initMessages[8]);
//     });

//     it('gcp init should fail with invalid working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './InitTests/InitFailInvalidWorkingDirectory.ts');
//         providerInitFail(tp, done, initFailMessages[0]);
//     });

//     /********************************************/
//     /*         terraform validate tests         */
//     /********************************************/

//     it('azure validate should succeed with no additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ValidateTests/ValidateSuccessNoAdditionalArgs.ts');
//         providerInit(tp, done, initMessages[9]);
//     });

//     it('azure validate should succeed with additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ValidateTests/ValidateSuccessAdditionalArgs.ts');
//         providerInit(tp, done, initMessages[10]);
//     });

//     it('azure validate should succeed with empty working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ValidateTests/ValidateSuccessEmptyWorkingDir.ts');
//         providerInit(tp, done, initMessages[11]);
//     });

//     it('azure validate should fail with invalid working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ValidateTests/ValidateFailInvalidWorkingDirectory.ts');
//         providerInitFail(tp, done, initFailMessages[1]);
//     });

//     it('aws validate should succeed with no additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ValidateTests/ValidateSuccessNoAdditionalArgs.ts');
//         providerInit(tp, done, initMessages[12]);
//     });

//     it('aws validate should succeed with additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ValidateTests/ValidateSuccessAdditionalArgs.ts');
//         providerInit(tp, done, initMessages[13]);
//     });

//     it('aws validate should succeed with empty working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ValidateTests/ValidateSuccessEmptyWorkingDir.ts');
//         providerInit(tp, done, initMessages[14]);
//     });

//     it('aws validate should fail with invalid working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ValidateTests/ValidateFailInvalidWorkingDirectory.ts');
//         providerInitFail(tp, done, initFailMessages[1]);
//     });

//     it('gcp validate should succeed with no additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ValidateTests/ValidateSuccessNoAdditionalArgs.ts');
//         providerInit(tp, done, initMessages[15]);
//     });

//     it('gcp validate should succeed with additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ValidateTests/ValidateSuccessAdditionalArgs.ts');
//         providerInit(tp, done, initMessages[16]);
//     });

//     it('gcp validate should succeed with empty working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ValidateTests/ValidateSuccessEmptyWorkingDir.ts');
//         providerInit(tp, done, initMessages[17]);
//     });

//     it('gcp validate should fail with invalid working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ValidateTests/ValidateFailInvalidWorkingDirectory.ts');
//         providerInitFail(tp, done, initFailMessages[1]);
//     });

//     /********************************************/
//     /*         terraform plan tests             */
//     /********************************************/

//     it('azure plan should succeed with no additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './PlanTests/PlanSuccessNoAdditionalArgs.ts');
//         providerPlanSuccess(tp, done, planSuccessMessages[0]);
//     });

//     it('azure plan should succeed with additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './PlanTests/PlanSuccessAdditionalArgs.ts');
//         providerPlanSuccess(tp, done, planSuccessMessages[1]);
//     });

//     it('azure plan should fail with invalid working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './PlanTests/PlanFailInvalidWorkingDirectory.ts');
//         providerInvalidParameters(tp, done, invalidConfigFilesMessage);
//     });

//     it('azure plan should fail with empty working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './PlanTests/PlanFailEmptyWorkingDirectory.ts');
//         providerInvalidParameters(tp, done, invalidConfigFilesMessage);
//     });

//     it('aws plan should succeed with no additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './PlanTests/PlanSuccessNoAdditionalArgs.ts');
//         providerPlanSuccess(tp, done, planSuccessMessages[2]);
//     });

//     it('aws plan should succeed with additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './PlanTests/PlanSuccessAdditionalArgs.ts');
//         providerPlanSuccess(tp, done, planSuccessMessages[3]);
//     });

//     it('aws plan should fail with invalid working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './PlanTests/PlanFailInvalidWorkingDirectory.ts');
//         providerPlanFailInvalidParameters(tp, done, invalidConfigFilesMessage);
//     });

//     it('aws plan should fail with empty working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './PlanTests/PlanFailEmptyWorkingDirectory.ts');
//         providerPlanFailInvalidParameters(tp, done, invalidConfigFilesMessage);
//     });

//     it('gcp plan should succeed with no additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './PlanTests/PlanSuccessNoAdditionalArgs.ts');
//         providerPlanSuccess(tp, done, planSuccessMessages[4]);
//     });

//     it('gcp plan should succeed with additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './PlanTests/PlanSuccessAdditionalArgs.ts');
//         providerPlanSuccess(tp, done, planSuccessMessages[5]);
//     });

//     it('gcp plan should fail with invalid working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './PlanTests/PlanFailInvalidWorkingDirectory.ts');
//         providerPlanFailInvalidParameters(tp, done, invalidConfigFilesMessage);
//     });

//     it('gcp plan should fail with empty working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './PlanTests/PlanFailEmptyWorkingDirectory.ts');
//         providerPlanFailInvalidParameters(tp, done, invalidConfigFilesMessage);
//     });

//     /********************************************/
//     /*         terraform apply tests            */
//     /********************************************/

//     it('azure apply should succeed with no additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ApplyTests/ApplySuccessNoAdditionalArgs.ts');
//         providerApplySuccessNoParameters(tp, done, applySuccessParametersMessages[0]);
//     });

//     it('azure apply should succeed with additional args with -auto-approve', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ApplyTests/ApplySuccessAdditionalArgsWithAutoApprove.ts');
//         providerApplySuccessNoParameters(tp, done, applySuccessParametersMessages[1]);
//     });

//     it('azure apply should succeed with additional args without -auto-approve', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ApplyTests/ApplySuccessAdditionalArgsWithoutAutoApprove.ts');
//         providerApplySuccessNoParameters(tp, done, applySuccessParametersMessages[2]);
//     });

//     it('azure apply should fail with invalid working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ApplyTests/ApplyFailInvalidWorkingDirectory.ts');
//         providerPlanFailInvalidParameters(tp, done, invalidConfigFilesMessage);
//     });

//     it('azure apply should fail with empty working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ApplyTests/ApplyFailEmptyWorkingDirectory.ts');
//         providerApplyFailEmptyWorkingDirectory(tp, done, invalidConfigFilesMessage);
//     });

//     it('aws apply should succeed with no additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ApplyTests/ApplySuccessNoAdditionalArgs.ts');
//         providerApplySuccessNoParameters(tp, done, applySuccessParametersMessages[3]);
//     });

//     it('aws apply should succeed with additional args with -auto-approve', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ApplyTests/ApplySuccessAdditionalArgsWithAutoApprove.ts');
//         providerApplySuccessNoParameters(tp, done, applySuccessParametersMessages[4]);
//     });

//     it('aws apply should succeed with additional args without -auto-approve', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ApplyTests/ApplySuccessAdditionalArgsWithoutAutoApprove.ts');
//         providerApplySuccessNoParameters(tp, done, applySuccessParametersMessages[5]);
//     });

//     it('aws apply should fail with invalid working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ApplyTests/ApplyFailInvalidWorkingDirectory.ts');
//         providerPlanFailInvalidParameters(tp, done, invalidConfigFilesMessage);
//     });

//     it('aws apply should fail with empty working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ApplyTests/ApplyFailEmptyWorkingDirectory.ts');
//         providerApplyFailEmptyWorkingDirectory(tp, done, invalidConfigFilesMessage);
//     });

//     it('gcp apply should succeed with no additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ApplyTests/ApplySuccessNoAdditionalArgs.ts');
//         providerApplySuccessNoParameters(tp, done, applySuccessParametersMessages[6]);
//     });

//     it('gcp apply should succeed with additional args with -auto-approve', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ApplyTests/ApplySuccessAdditionalArgsWithAutoApprove.ts');
//         providerApplySuccessNoParameters(tp, done, applySuccessParametersMessages[7]);
//     });

//     it('gcp apply should succeed with additional args without -auto-approve', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ApplyTests/ApplySuccessAdditionalArgsWithoutAutoApprove.ts');
//         providerApplySuccessNoParameters(tp, done, applySuccessParametersMessages[8]);
//     });

//     it('gcp apply should fail with invalid working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ApplyTests/ApplyFailInvalidWorkingDirectory.ts');
//         providerPlanFailInvalidParameters(tp, done, invalidConfigFilesMessage);
//     });

//     it('gcp apply should fail with empty working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './ApplyTests/ApplyFailEmptyWorkingDirectory.ts');
//         providerApplyFailEmptyWorkingDirectory(tp, done, invalidConfigFilesMessage);
//     });

//     /********************************************/
//     /*         terraform destroy tests          */
//     /********************************************/

//     it('azure destroy should succeed with no additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './DestroyTests/DestroySuccessNoAdditionalArgs.ts');
//         providerPlanSuccess(tp, done, planSuccessMessages[6]);
//     });

//     it('azure destroy should succeed with additional args with -auto-approve', (done: MochaDone) => {
//         let tp = path.join(__dirname, './DestroyTests/DestroySuccessAdditionalArgsWithAutoApprove.ts');
//         providerPlanSuccess(tp, done, planSuccessMessages[7]);
//     });

//     it('azure destroy should succeed with additional args without -auto-approve', (done: MochaDone) => {
//         let tp = path.join(__dirname, './DestroyTests/DestroySuccessAdditionalArgsWithoutAutoApprove.ts');
//         providerPlanSuccess(tp, done, planSuccessMessages[8]);
//     });

//     it('azure destroy should fail with invalid working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './DestroyTests/DestroyFailInvalidWorkingDirectory.ts');
//         providerPlanFailInvalidParameters(tp, done, invalidConfigFilesMessage);
//     });

//     it('aws destroy should succeed with no additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './DestroyTests/DestroySuccessNoAdditionalArgs.ts');
//         providerPlanSuccess(tp, done, planSuccessMessages[9]);
//     });

//     it('aws destroy should succeed with additional args with -auto-approve', (done: MochaDone) => {
//         let tp = path.join(__dirname, './DestroyTests/DestroySuccessAdditionalArgsWithAutoApprove.ts');
//         providerPlanSuccess(tp, done, planSuccessMessages[10]);
//     });

//     it('aws destroy should succeed with additional args without -auto-approve', (done: MochaDone) => {
//         let tp = path.join(__dirname, './DestroyTests/DestroySuccessAdditionalArgsWithoutAutoApprove.ts');
//         providerPlanSuccess(tp, done, planSuccessMessages[11]);
//     });

//     it('aws destroy should fail with invalid working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './DestroyTests/DestroyFailInvalidWorkingDirectory.ts');
//         providerPlanFailInvalidParameters(tp, done, invalidConfigFilesMessage);
//     });

//     it('gcp destroy should succeed with no additional args', (done: MochaDone) => {
//         let tp = path.join(__dirname, './DestroyTests/DestroySuccessNoAdditionalArgs.ts');
//         providerPlanSuccess(tp, done, planSuccessMessages[12]);
//     });

//     it('gcp destroy should succeed with additional args with -auto-approve', (done: MochaDone) => {
//         let tp = path.join(__dirname, './DestroyTests/DestroySuccessAdditionalArgsWithAutoApprove.ts');
//         providerPlanSuccess(tp, done, planSuccessMessages[13]);
//     });

//     it('gcp destroy should succeed with additional args without -auto-approve', (done: MochaDone) => {
//         let tp = path.join(__dirname, './DestroyTests/DestroySuccessAdditionalArgsWithoutAutoApprove.ts');
//         providerPlanSuccess(tp, done, planSuccessMessages[14]);
//     });

//     it('gcp destroy should fail with invalid working directory', (done: MochaDone) => {
//         let tp = path.join(__dirname, './DestroyTests/DestroyFailInvalidWorkingDirectory.ts');
//         providerPlanFailInvalidParameters(tp, done, invalidConfigFilesMessage);
//     });

//     /********************************************/
//     /*         test for multiple providers      */
//     /********************************************/

//     // it('warnIfMultipleProviders should not warn for single provider', (done: MochaDone) => {
//     //     let tp = path.join(__dirname, './MultipleProviderTests/SingleProviderNoWarning.ts');
//     //     let tr : ttm.MockTestRunner = new ttm.MockTestRunner(tp);

//     //     try {
//     //         tr.run();

//     //         assert(tr.succeeded, 'task should have succeeded');
//     //         assert(tr.invokedToolCount === 1, 'should have invoked tool one time. actual: ' + tr.invokedToolCount);
//     //         assert(tr.errorIssues.length === 0, 'should have no errors');
//     //         assert(tr.warningIssues.length === 0, 'should have no warnings');    

//     //         done();
//     //     } catch(error) {
//     //         done(error);
//     //     }
//     // });

//     // it('warnIfMultipleProviders should warn correctly for multiple providers', (done: MochaDone) => {
//     //     let tp = path.join(__dirname, './MultipleProviderTests/MultipleProviderWarning.ts');
//     //     let tr : ttm.MockTestRunner = new ttm.MockTestRunner(tp);

//     //     try {
//     //         tr.run();

//     //         assert(tr.succeeded, 'task should have succeeded');
//     //         assert(tr.invokedToolCount === 1, 'should have invoked tool one time. actual: ' + tr.invokedToolCount);
//     //         assert(tr.errorIssues.length === 0, 'should have no errors');
//     //         assert(tr.warningIssues.length === 1, 'should have one warning');  
//     //         assert(tr.createdWarningIssue('Multiple provider blocks specified in the .tf files in the current working directory.'), 'Should have created warning: Multiple provider blocks specified in the .tf files in the current working directory.');  

//     //         done();
//     //     } catch(error) {
//     //         done(error);
//     //     }
//     // });

//     /*************************************************************************************/
//     /*         test for compareVersions method of BaseTerraformCommandHandler class      */
//     /*************************************************************************************/


//     it('compareVersions should compare two versions correctly', (done: MochaDone) => {
//         let tp = path.join(__dirname, './L0CompareVersions.ts');
//         let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
//         try {
//             tr.run();

//             assert(tr.stdOutContained('compareVersions("0.20.7", "0.20.8") should have been -1'), 'Should have printed: ("0.20.7", "0.20.8") should have been -1' + tr.stdout);
//             assert(tr.stdOutContained('compareVersions("0.20.9", "0.20.8") should have been 1'), 'Should have printed: ("0.20.9", "0.20.8") should have been 1');
//             assert(tr.stdOutContained('compareVersions("0.2.9", "0.2.9") should have been 0'), 'Should have printed: ("0.2.9", "0.2.9") should have been 0');
//             assert(tr.stdOutContained('compareVersions("0.20.9", "0.20.09") should have been 0'), 'Should have printed: compareVersions("0.20.9", "0.20.09") should have been 0');
//             assert(tr.stdOutContained('compareVersions("0.21.9", "0.20.9") should have been 1'), 'Should have printed: compareVersions("0.21.9", "0.20.9") should have been 1');
//             assert(tr.stdOutContained('compareVersions("1.20.10", "0.20.11") should have been 1'), 'Should have printed: compareVersions("1.20.10", "0.20.11") should have been 1');

//             done();
//         } catch (error) {
//             done(error);
//         }
//     });
// });


// function providerInit(tp: string, done: MochaDone, message: string) {
//     let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
//     try {
//         tr.run();
//         assertInitParameters(tr);
//         assert(tr.stdOutContained(message), 'Should have printed: ' + message);
//         done();
//     }
//     catch (error) {
//         done(error);
//     }
// }

// function providerInitFail(tp: string, done: MochaDone, message: string) {
//     let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
//     try {
//         tr.run();
//         assertInitFailParameters(tr);
//         assert(tr.stdOutContained(message), 'Should have printed: ' + message);
//         done();
//     }
//     catch (error) {
//         done(error);
//     }
// }

// function providerPlanSuccess(tp: string, done: MochaDone, message: string) {
//     let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
//     try {
//         tr.run();
//         assertPlanSuccessParameters(tr);
//         assert(tr.stdOutContained(message), 'Should have printed: ' + message);
//         done();
//     }
//     catch (error) {
//         done(error);
//     }
// }

// function providerInvalidParameters(tp: string, done: MochaDone, message: string) {
//     let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
//     try {
//         tr.run();
//         assertPlanInvalidParameters(tr);
//         assert(tr.stdOutContained(message), 'Should have printed: ' + message);
//         done();
//     }
//     catch (error) {
//         done(error);
//     }
// }

// function providerPlanFailInvalidParameters(tp: string, done: MochaDone, message: string) {
//     let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
//     try {
//         tr.run();
//         assertPlanFailInvalidParameters(tr);
//         assert(tr.stdOutContained(message), 'Should have printed: ' + message);
//         done();
//     }
//     catch (error) {
//         done(error);
//     }
// }

// function providerApplyFailEmptyWorkingDirectory(tp: string, done: MochaDone, message: string) {
//     let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
//     try {
//         tr.run();
//         assertApplyFailEmptyParameters(tr);
//         assert(tr.stdOutContained(message), 'Should have printed: ' + message);
//         done();
//     }
//     catch (error) {
//         done(error);
//     }
// }

// function providerApplySuccessNoParameters(tp: string, done: MochaDone, message: string) {
//     let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
//     try {
//         tr.run();
//         assertApplySuccessNoParameters(tr);
//         assert(tr.stdOutContained(message), 'Should have printed: ' + message);
//         done();
//     }
//     catch (error) {
//         done(error);
//     }
// }

// const taskShouldHaveFailedMessage = 'task should have failed';
// const taskShouldHaveSuccseededMessage = 'task should have succeeded';

// const shoukdHaveOneErrorMessage = 'should have one error';
// const shoukdHaveNoErrorsMessage = 'should have no errors';

// const shouldHaveNoWarningsMessage = 'should have no warnings';


// function assertApplyFailEmptyParameters(tr: ttm.MockTestRunner) {
//     assert(tr.failed, taskShouldHaveFailedMessage);
//     assert(tr.invokedToolCount === 3, 'tool should have been invoked three times. actual: ' + tr.invokedToolCount);
//     assert(tr.errorIssues.length === 1, shoukdHaveOneErrorMessage);
//     assert(tr.warningIssues.length === 0, shouldHaveNoWarningsMessage);
// }

// function assertApplySuccessNoParameters(tr: ttm.MockTestRunner) {
//     assert(tr.succeeded, taskShouldHaveSuccseededMessage);
//     assert(tr.invokedToolCount === 3, 'tool should have been invoked three times. actual: ' + tr.invokedToolCount);
//     assert(tr.errorIssues.length === 0, shoukdHaveNoErrorsMessage);
//     assert(tr.warningIssues.length === 0, shouldHaveNoWarningsMessage);

// }

// function assertPlanFailInvalidParameters(tr: ttm.MockTestRunner) {
//     assert(tr.failed, taskShouldHaveFailedMessage);
//     assert(tr.invokedToolCount === 2, 'tool should have been invoked two times. actual: ' + tr.invokedToolCount);
//     assert(tr.errorIssues.length === 1, shoukdHaveOneErrorMessage);
//     assert(tr.warningIssues.length === 0, shouldHaveNoWarningsMessage);
// }

// function assertPlanSuccessParameters(tr: ttm.MockTestRunner) {
//     assert(tr.succeeded, taskShouldHaveSuccseededMessage);
//     assert(tr.invokedToolCount === 2, 'tool should have been invoked two times. actual: ' + tr.invokedToolCount);
//     assert(tr.errorIssues.length === 0, shoukdHaveNoErrorsMessage);
//     assert(tr.warningIssues.length === 0, shouldHaveNoWarningsMessage);
// }

// function assertPlanInvalidParameters(tr: ttm.MockTestRunner) {
//     assert(tr.failed, taskShouldHaveFailedMessage);
//     assert(tr.invokedToolCount === 2, 'tool should have been invoked two times. actual: ' + tr.invokedToolCount);
//     assert(tr.errorIssues.length === 1, shoukdHaveOneErrorMessage);
//     assert(tr.warningIssues.length === 0, shouldHaveNoWarningsMessage);
// }

// function assertInitFailParameters(tr: ttm.MockTestRunner) {
//     assert(tr.failed, taskShouldHaveFailedMessage);
//     assert(tr.invokedToolCount === 1, 'tool should have been invoked one time. actual: ' + tr.invokedToolCount);
//     assert(tr.errorIssues.length === 1, shoukdHaveOneErrorMessage);
//     assert(tr.warningIssues.length === 0, shouldHaveNoWarningsMessage);
// }

// function assertInitParameters(tr: ttm.MockTestRunner) {
//     assert(tr.succeeded, taskShouldHaveSuccseededMessage);
//     assert(tr.invokedToolCount === 1, 'tool should have been invoked one time. actual: ' + tr.invokedToolCount);
//     assert(tr.errorIssues.length === 0, shoukdHaveNoErrorsMessage);
//     assert(tr.warningIssues.length === 0, shouldHaveNoWarningsMessage);
// }
