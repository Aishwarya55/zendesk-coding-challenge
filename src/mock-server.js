import { Response, Server, Model } from "miragejs"



const server = new Server({
    urlPrefix: "http://localhost:8000/",
    namespace: "api",
    model: {
        subscription: Model
    },
    routes() {
        this.get("/testing", (schema, request) => {

            return new Response(200, { "Content-Type": "application/json" }, { data: 'running' });

        });


        this.get("/current", (schema, request) => {
            const subscription = schema.db.subscription.findBy({ id: 2 })
            return new Response(200, { "Content-Type": "application/json" }, subscription);
        });

        this.put("/current", (schema, request) => {


            let data = JSON.parse(request.requestBody)
            let planName = schema.db.planNames.findBy({ value: data.plan })
            let planCost = schema.db.planCosts.findBy({ name: planName.value })
            let newData = {
                plan: data.plan,
                name: planName["name"],
                seats: data.seats,
                cost: data.seats * planCost["value"]
            }


            let prevSubscription = schema.db.subscription.findBy({ id: 2 })

            schema.db.subscription.update(2, { ...newData })


            schema.db.subscription.update(1, {
                plan: prevSubscription.plan,
                name: prevSubscription.name,
                seats: prevSubscription.seats,
                cost: prevSubscription.cost

            })

            return new Response(200, { "Content-Type": "application/json" }, newData)
        })

        this.post("/preview", (schema, request) => {
            let data = JSON.parse(request.requestBody)
            let planName = schema.db.planNames.findBy({ value: data.plan })
            let planCost = schema.db.planCosts.findBy({ name: data.plan })
            return new Response(200, { "Content-Type": "application/json" }, {
                plan: data.plan,
                name: planName["name"],
                seats: data.seats,
                cost: data.seats * planCost["value"]
            })
        }, { timing: 1000 })
    }
});
server.passthrough();

server.db.loadData({
    subscription: [{
        plan: 'good',
        name: 'Good',
        seats: 5,
        cost: 50,
        id: 1
    },
    {
        plan: 'good',
        name: 'Good',
        seats: 5,
        cost: 50,
        id: 2
    }

    ],
    planNames: [
        {
            name: "Basic",
            value: "basic"
        },
        {
            name: "Good",
            value: "good"
        },
        {
            name: "Better",
            value: "better"
        },
        {
            name: "Best",
            value: "best"
        }


    ],
    planCosts: [
        {
            name: "basic",
            value: 1
        },
        {
            name: "good",
            value: 10
        },
        {
            name: "better",
            value: 100
        },
        {
            name: "best",
            value: 1000
        }
    ]
})
