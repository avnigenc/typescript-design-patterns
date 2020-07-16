/**
 * The Abstract Factory interface declares a set of methods that return
 * different abstract products. These products are called a family and are
 * related by a high-level theme or concept. Products of one family are usually
 * able to collaborate among themselves. A family of products may have several
 * variants, but the products of one variant are incompatible with products of
 * another.
 */
interface GUIFactory {
    createButton(): Button;

    createCheckbox(): Checkbox;
}

/**
 * Concrete Factories produce a family of products that belong to a single
 * variant. The factory guarantees that resulting products are compatible. Note
 * that signatures of the Concrete Factory's methods return an abstract product,
 * while inside the method a concrete product is instantiated.
 */
class WinFactory implements GUIFactory {
    public createButton(): Button {
        return new WinButton();
    }

    public createCheckbox(): Checkbox {
        return new WinCheckbox();
    }
}

/**
 * Each Concrete Factory has a corresponding product variant.
 */
class MacFactory implements GUIFactory {
    public createButton(): Button {
        return new MacButton();
    }

    public createCheckbox(): Checkbox {
        return new MacCheckbox();
    }
}

/**
 * Each distinct product of a product family should have a base interface. All
 * variants of the product must implement this interface.
 */
interface Button {
    usefulFunctionA(): string;
}

/**
 * These Concrete Products are created by corresponding Concrete Factories.
 */
class WinButton implements Button {
    public usefulFunctionA(): string {
        return 'The result of the product WIN_BUTTON.';
    }
}

class MacButton implements Button {
    public usefulFunctionA(): string {
        return 'The result of the product MAC_BUTTON.';
    }
}

/**
 * Here's the the base interface of another product. All products can interact
 * with each other, but proper interaction is possible only between products of
 * the same concrete variant.
 */
interface Checkbox {
    /**
     * Product B is able to do its own thing...
     */
    usefulFunctionB(): string;

    /**
     * ...but it also can collaborate with the ProductA.
     *
     * The Abstract Factory makes sure that all products it creates are of the
     * same variant and thus, compatible.
     */
    anotherUsefulFunctionB(collaborator: Button): string;
}

/**
 * These Concrete Products are created by corresponding Concrete Factories.
 */
class WinCheckbox implements Checkbox {

    public usefulFunctionB(): string {
        return 'The result of the product WIN_CHECKBOX.';
    }

    /**
     * The variant, Product B1, is only able to work correctly with the variant,
     * Product A1. Nevertheless, it accepts any instance of Button as
     * an argument.
     */
    public anotherUsefulFunctionB(collaborator: Button): string {
        const result = collaborator.usefulFunctionA();
        return `The result of the WIN_CHECKBOX collaborating with the (${result})`;
    }
}

class MacCheckbox implements Checkbox {

    public usefulFunctionB(): string {
        return 'The result of the product MAC_CHECKBOX.';
    }

    /**
     * The variant, Product B2, is only able to work correctly with the variant,
     * Product A2. Nevertheless, it accepts any instance of Button as
     * an argument.
     */
    public anotherUsefulFunctionB(collaborator: Button): string {
        const result = collaborator.usefulFunctionA();
        return `The result of the MAC_CHECKBOX collaborating with the (${result})`;
    }
}

/**
 * The client code works with factories and products only through abstract
 * types: GUIFactory and AbstractProduct. This lets you pass any factory or
 * product subclass to the client code without breaking it.
 */
function clientCode(factory: GUIFactory) {
    const productA = factory.createButton();
    const productB = factory.createCheckbox();

    console.log(productB.usefulFunctionB());
    console.log(productB.anotherUsefulFunctionB(productA));
}

/**
 * The client code can work with any concrete factory class.
 */
console.log('Client: Testing client code with the first factory type...');
clientCode(new WinFactory());

console.log('');

console.log('Client: Testing the same client code with the second factory type...');
clientCode(new MacFactory());
