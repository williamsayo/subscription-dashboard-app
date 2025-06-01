const mongoose = require("mongoose");

const Schema = mongoose.Schema;

function getNextBillingDate(billingDate, billingFrequency) {
    const currentDate = new Date();
    const nextBillingDate = new Date(billingDate);

    if (nextBillingDate < currentDate) {
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const billingMonth = nextBillingDate.getMonth();
        nextBillingDate.setFullYear(currentYear);
        switch (billingFrequency) {
            case "monthly":
                nextBillingDate.setMonth(currentMonth);
                break;
            case "quarterly":
                const nextQuarter = Math.ceil(
                    (currentMonth - billingMonth) / 3
                );
                nextBillingDate.setMonth(billingMonth + 3 * nextQuarter || 1);
                break;
            case "yearly":
                nextBillingDate.setFullYear(
                    billingMonth <= currentMonth ? currentYear + 1 : currentYear
                );
                break;
        }
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

// SubscriptionSchema.virtual("nextBillingDate")
//     .get(function () {
//         return getNextBillingDate(this.nextBilling, this.billingFrequency);
//     })
//     .set(function (nextBillingDate) {
//         this.set({ nextBilling: nextBillingDate });
//         this.save();
//     });

module.exports = mongoose.model("Subscription", SubscriptionSchema);
module.exports.getNextBillingDate = getNextBillingDate;
