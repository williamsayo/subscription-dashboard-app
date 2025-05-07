const mongoose = require("mongoose");

const Schema = mongoose.Schema;

function getNextBillingDate(billingDate, billingFrequency) {
    const currentDate = new Date();
    const nextBillingDate = new Date(billingDate);

    switch (billingFrequency) {
        case "monthly":
            if (nextBillingDate < currentDate) {
                nextBillingDate.setMonth(currentDate.getMonth());
            }
            nextBillingDate.setFullYear(currentDate.getFullYear());
            break;
        case "quarterly":
            if (nextBillingDate < currentDate) {
                const nextQuarter = !(
                    currentDate.getMonth === nextBillingDate.getMonth
                )
                    ? Math.ceil(
                          (currentDate.getMonth() -
                              nextBillingDate.getMonth()) /
                              3
                      )
                    : 1;

                nextBillingDate.setMonth(
                    nextBillingDate.getMonth() + 3 * nextQuarter
                );

            }
            nextBillingDate.setFullYear(currentDate.getFullYear());
            break;
        case "yearly":
            nextBillingDate.setFullYear(
                nextBillingDate < currentDate
                    ? nextBillingDate.getFullYear() + 1
                    : nextBillingDate.getFullYear()
            );
            break;
    }

    return nextBillingDate;
}

const SubscriptionSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

        name: {
            type: String,
            required: true,
            unique: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
        billingFrequency: {
            type: String,
            required: true,
            enum: ["monthly", "quarterly", "yearly"],
            default: "monthly",
        },
        originalBillingDate: {
            type: Date,
            required: true,
            default: () => Date.now(),
        },
        nextBilling: {
            type: Date,
            required: false,
            default: function () {
                return getNextBillingDate(
                    this.originalBillingDate,
                    this.billingFrequency
                );
            },
        },
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

SubscriptionSchema.virtual("nextBillingDate")
    .get(function () {
        return getNextBillingDate(this.nextBilling, this.billingFrequency);
    })
    .set(function (nextBillingDate) {
        this.set({ nextBilling: nextBillingDate });
    });

module.exports = mongoose.model("Subscription", SubscriptionSchema);
