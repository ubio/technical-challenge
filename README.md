# Technical Challenge

This is an HTTP Server built using [Node Framework](https://github.com/ubio/node-framework) (our framework for building back-end applications). This application consists of a simple task manager, where it is possible to find, list, create, complete, and delete tasks. It is developed using our default code structure and design practices.

## Goal

Your goal is to implement two new features in this application:

### Soft Delete of tasks

As it currently stands the `DELETE` end-point removes the task from the database. We want to be able to have a history of the deleted tasks, so we want you to implement a soft delete functionality. The soft-deleted tasks should not show up in the list end-point but should be accessible via the find end-point. Make any necessary changes to the code as you see fit.

### Owner entity

We want to introduce a new entity to the system, the `Owner` of the task. These are the requirements for this feature:

-   An owner must be created before tasks can be associated with them.
-   Tasks may or may not have an owner.
-   It must be possible to create and delete an owner, if an owner is deleted, all of the tasks associated with them should also be deleted.
-   The deletion of the owner is also a soft delete, just like the tasks.
-   It must be possible to change the owner of a task, as well as the information about the owner.
-   It must be possible to retrieve all the tasks of a specific owner.

The `Owner` schema should be as follows:

```ts
{
	id: string,
	name: string,
	email: string,
	dateOfBirth: string // YYYY-MM-dd
}
```

## Production Ready

As a final requirement, please attach a markdown file to your submission with an explanation of how to make this application production ready, please include as many details as possible about the observability tools, infrastructure, and anything else that you would use to achieve this.

## Resources

-   [Node Framework Documentation](https://github.com/ubio/node-framework/tree/main/docs)
-   [Drawn.io](https://app.diagrams.net/)
-   [MongoDB Documentation](https://www.mongodb.com/docs/)
