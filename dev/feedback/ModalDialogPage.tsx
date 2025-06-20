import { clsx } from 'clsx';
import type { FC } from 'react';
import { useState } from 'react';
import { Button, CardModal, Input, ModalDialog } from '../../src';

export const ModalDialogPage: FC = () => {
  const [plainDialogOpen, setPlainDialogOpen] = useState(false);

  const [smallOpen, setSmallOpen] = useState(false);
  const [mediumOpen, setMediumOpen] = useState(false);
  const [largeOpen, setLargeOpen] = useState(false);
  const [extraLargeOpen, setExtraLargeOpen] = useState(false);

  const [dangerOpen, setDangerOpen] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmDisabledOpen, setConfirmDisabledOpen] = useState(false);
  const [dangerConfirmOpen, setDangerConfirmOpen] = useState(false);

  const [formOpen, setFormOpen] = useState(false);

  const [contentOpen, setContentOpen] = useState(false);

  const [coverOpen, setCoverOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <h2>Plain modal dialog</h2>
        <div className="flex gap-x-2">
          <Button onClick={() => setPlainDialogOpen(true)}>Open</Button>
        </div>
      </div>
      <ModalDialog
        open={plainDialogOpen}
        onClose={() => setPlainDialogOpen(false)}
        className={clsx(({
          'flex w-screen h-screen max-w-screen max-h-screen': plainDialogOpen,
        }))}
      >
        <div className="p-3 bg-white m-auto">
          <p className="text-black">Hello</p>
          <Button className="mt-3" variant="secondary" onClick={() => setPlainDialogOpen(false)}>Close me</Button>
        </div>
      </ModalDialog>

      <div className="flex flex-col gap-y-2">
        <h2>Card modal sizes</h2>
        <div className="flex gap-x-2">
          <Button onClick={() => setSmallOpen(true)}>Small</Button>
          <Button onClick={() => setMediumOpen(true)}>Medium</Button>
          <Button onClick={() => setLargeOpen(true)}>Large</Button>
          <Button onClick={() => setExtraLargeOpen(true)}>Extra large</Button>
        </div>
      </div>

      <CardModal size="sm" title="Small dialog" open={smallOpen} onClose={() => setSmallOpen(false)}>
        Small dialog
      </CardModal>
      <CardModal size="md" title="Medium dialog" open={mediumOpen} onClose={() => setMediumOpen(false)}>
        Medium dialog
      </CardModal>
      <CardModal size="lg" title="Large dialog" open={largeOpen} onClose={() => setLargeOpen(false)}>
        Large dialog
      </CardModal>
      <CardModal size="xl" title="Extra large dialog" open={extraLargeOpen} onClose={() => setExtraLargeOpen(false)}>
        Extra large dialog
      </CardModal>

      <div className="flex flex-col gap-y-2">
        <h2>Danger card modal</h2>
        <div className="flex gap-x-2">
          <Button variant="danger" onClick={() => setDangerOpen(true)}>Danger</Button>
        </div>
      </div>

      <CardModal
        size="md"
        title="Danger dialog"
        variant="danger"
        open={dangerOpen}
        onClose={() => setDangerOpen(false)}
      >
        Danger dialog
      </CardModal>

      <div className="flex flex-col gap-y-2">
        <h2>Card modal with confirm button</h2>
        <div className="flex gap-x-2">
          <Button onClick={() => setConfirmOpen(true)}>Custom confirm</Button>
          <Button onClick={() => setConfirmDisabledOpen(true)}>Confirm disabled</Button>
          <Button variant="danger" onClick={() => setDangerConfirmOpen(true)}>Danger with confirm</Button>
        </div>
      </div>

      <CardModal
        size="md"
        title="Custom confirm"
        confirmText="Accept the action"
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => setConfirmOpen(false)}
        onClosed={(exitAction) => console.log(`Closed custom confirm: ${exitAction}`)}
      >
        Custom confirm text
      </CardModal>
      <CardModal
        size="md"
        title="Custom disabled"
        confirmDisabled
        open={confirmDisabledOpen}
        onClose={() => setConfirmDisabledOpen(false)}
        onConfirm={() => setConfirmDisabledOpen(false)}
      >
        Custom action is disabled
      </CardModal>
      <CardModal
        size="md"
        title="Danger dialog"
        variant="danger"
        open={dangerConfirmOpen}
        onClose={() => setDangerConfirmOpen(false)}
        onConfirm={() => setDangerConfirmOpen(false)}
        onClosed={(exitAction) => console.log(`Closed danger dialog: ${exitAction}`)}
      >
        Danger dialog with confirm buttons
      </CardModal>

      <div className="flex flex-col gap-y-2">
        <h2>Card modal with form</h2>
        <div className="flex gap-x-2">
          <Button onClick={() => setFormOpen(true)}>With form</Button>
        </div>
      </div>

      <CardModal
        size="md"
        title="Dialog with form"
        variant="danger"
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onConfirm={() => setFormOpen(false)}
        onClosed={(exitAction) => console.log(`Closed form dialog: ${exitAction}`)}
      >
        <div className="flex flex-col gap-3">
          <Input placeholder="Foo" name="foo" />
          <Input placeholder="Bar" name="bar" />
        </div>
      </CardModal>

      <div className="flex flex-col gap-y-2">
        <h2>Card modal with a lot of content</h2>
        <div className="flex gap-x-2">
          <Button onClick={() => setContentOpen(true)}>Open</Button>
        </div>
      </div>

      <CardModal
        size="md"
        title="Fixed header and footer"
        open={contentOpen}
        onClose={() => setContentOpen(false)}
        onConfirm={() => setContentOpen(false)}
      >
        <div className="flex flex-col gap-y-3">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
        </div>
      </CardModal>

      <div className="flex flex-col gap-y-2">
        <h2>Cover card modal</h2>
        <div className="flex gap-x-2">
          <Button onClick={() => setCoverOpen(true)}>Open</Button>
        </div>
      </div>

      <CardModal
        variant="cover"
        title="Cover modal"
        open={coverOpen}
        onClose={() => setCoverOpen(false)}
      >
        <div className="p-3 flex flex-col gap-y-3">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
        </div>
      </CardModal>
    </div>
  );
};
