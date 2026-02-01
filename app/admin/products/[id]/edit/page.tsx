import {
  fetchAdminProductDetails,
  updateProductAction,
  updateProductImageAction,
} from "@/utils/action";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { SubmitButton } from "@/components/form/Buttons";
import CheckBoxInput from "@/components/form/CheckBoxInput";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import { Card, CardContent } from "@/components/ui/card";
import DropDownInput from "@/components/form/DropDownInput";

const EditPageProduct = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const product = await fetchAdminProductDetails(id);
  const { name, company, description, featured, price } = product;
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">update product</h1>
      <Card
        className="p-8 bg-[#072611]/60 dark:bg-slate-900/80 backdrop-blur-sm
                border border-emerald-700/30 dark:border-blue-300/20 
                shadow-[0_4px_12px_rgba(34,139,34,0.15)] dark:shadow-[0_4px_12px_rgba(30,144,255,0.2)]"
      >
        <CardContent>
          {/* Image Input Container */}
          <ImageInputContainer
            action={updateProductImageAction}
            name={name}
            image={product.image}
            text="update image"
          >
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="url" value={product.image} />
          </ImageInputContainer>
          <FormContainer action={updateProductAction}>
            <div className="grid gap-4 md:grid-cols-2 my-4">
              <input type="hidden" name="id" value={id} />
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

              <PriceInput defaultValue={price} />
              <DropDownInput />
            </div>
            <TextAreaInput
              name="description"
              labelText="product description"
              defaultValue={description}
            />
            <div className="mt-6">
              <CheckBoxInput
                name="featured"
                label="featured"
                defaultChecked={featured}
              />
            </div>
            <SubmitButton text="update product" className="mt-8" />
          </FormContainer>
        </CardContent>
      </Card>
    </section>
  );
};

export default EditPageProduct;
