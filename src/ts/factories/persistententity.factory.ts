const persistentEntityFactoryFactory = (entityFactory: EntityFactory, persistentId: number) => {
    return (x: number, y: number, id: IdFactory) => {
        let entities = entityFactory(x, y, id);
        if (!localStorage.getItem(persistentId as any)) {
            entities[0].persistentId = persistentId;
            entities[0].id = persistentId;
        } else {
            entities = [];
        }
        return entities;    
    }
};