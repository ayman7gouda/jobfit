import { FormProvider, useForm } from 'react-hook-form';

import { NoUndefinedField } from 'lib/utils';

import { Input, TextArea } from './Form';
import { useRemoveDescriptionMutation } from './queries/RemoveDescription.generated';
import { SkillDetailsQuery } from './queries/SkillDetails.query.generated';
import { useUpdateDescriptionMutation } from './queries/UpdateDescription.generated';

type Cluster = NoUndefinedField<SkillDetailsQuery>["skillCluster"];

export function SkillForm({
  description,
  skillCluster,
}: {
  description: Cluster["descriptions"][0];
  skillCluster: Cluster;
}) {
  const [saveForm, { loading }] = useUpdateDescriptionMutation();
  const [deleteDescription, { loading: deleting }] =
    useRemoveDescriptionMutation();

  const { __typename, ...initialValues } = description;
  const form = useForm({
    defaultValues: initialValues,
  });
  return (
    <div className="h-full">
      <FormProvider {...form}>
        <form
          className="flex flex-col h-full max-w-3xl"
          onSubmit={form.handleSubmit((values, actions) => {
            debugger;
            saveForm({
              variables: {
                description: values,
              },
            });
          })}
        >
          <Input label="Source" name="name" placeholder="Name" />
          <Input label="Url" name="source" placeholder="Source Url" />
          <TextArea
            className="flex-1"
            label="Description"
            name="description"
            placeholder="Describe the skill"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="max-w-xs bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded"
            >
              {loading ? "Saving ..." : "Save"}
            </button>
            <button
              type="button"
              className="max-w-xs bg-red-500 hover:bg-red-700 text-white font-bold mt-2 py-2 px-4 rounded"
              onClick={() => {
                if (confirm("Are you sure?")) {
                  deleteDescription({
                    variables: {
                      clusterId: skillCluster.id,
                      descriptionId: description.id,
                    },
                  });
                }
              }}
            >
              {deleting ? "Deleting ..." : "Delete"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
