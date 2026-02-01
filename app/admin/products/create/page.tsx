import FormInput from "@/components/form/FormInput";
import FormContainer from "@/components/form/FormContainer";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { faker } from "@faker-js/faker";
import { SubmitButton } from "@/components/form/Buttons";
import CheckBoxInput from "@/components/form/CheckBoxInput";
import { createProductAction } from "@/utils/action";
import { Card, CardContent } from "@/components/ui/card";
import DropDownInput from "@/components/form/DropDownInput";

const CreateProductPage = () => {
  const name = faker.commerce.productName();
  const company = faker.company.name();
  const description = faker.lorem.paragraph({ min: 10, max: 12 });

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create product</h1>
      <Card
        className="text-white/90 border p-8 rounded-md bg-[#072611]/60 dark:bg-slate-900/80 backdrop-blur-sm
                border border-emerald-700/30 dark:border-blue-300/20 
                shadow-[0_4px_12px_rgba(34,139,34,0.15)] dark:shadow-[0_4px_12px_rgba(30,144,255,0.2)]"
      >
        <CardContent>
          <FormContainer action={createProductAction}>
            <div className="grid gap-4 md:grid-cols-2 my-4">
              <FormInput
                type="text"
                name="name"
                label="product name"
                defaultValue={name}
              />
              <FormInput
                type="text"
                name="company"
                label="company"
                defaultValue={company}
              />
              <PriceInput />
              <ImageInput />
            </div>
            <TextAreaInput
              name="description"
              labelText="product description"
              defaultValue={description}
            />
            <div className="mt-6 flex justify-between">
              <DropDownInput name="quantity" label="Quantity" />
              <CheckBoxInput name="featured" label="featured" />
            </div>
            <SubmitButton text="Create Product" className="mt-8" />
          </FormContainer>
        </CardContent>
      </Card>
    </section>
  );
};

export default CreateProductPage;
