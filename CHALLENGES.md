# Technical Challenge

The following challenges help us understand your ability to write clean concise code which is easy to reason about, maintain and support.

We are also keen on seeing your approach to naming (because we know how hard naming is!), explaining technical choices, structuring the entities around your codebase, as well as testing and documenting them.

<!-- Please see [Our Expectations](#our-expectations) below for more details. -->

## Challenge: soft delete

As it currently stands the `DELETE` endpoint irreversibly removes the task from the database.

We want to be able to have a history of the deleted tasks and ability to "undo" the delete — such an approach is known in the industry as "soft delete".

The main requirement is: soft-deleted tasks should not show up in the `GET /tasks` endpoint but should still be accessible via `GET /tasks/{taskId}` endpoint. The rest is up to you in terms of how you want to do it, which supporting functionality to provide, etc. Feel free to make any necessary changes to the codebase as you see fit.

## Resources

-   [Node Framework Documentation](https://github.com/ubio/node-framework/tree/main/docs)
-   [Draw.io](https://app.diagrams.net/)
-   [MongoDB Documentation](https://www.mongodb.com/docs/)
