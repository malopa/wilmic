import React from 'react'

export default function MenuConfig() {
    const [tabs] = useState([
        {
            header: 'Title I',
            children: <p className="m-0">Roles</p>
        },
        {
            header: 'Title II',
            children: <p className="m-0">Loan Type</p>
        },
    ]);

    const createDynamicTabs = () => {
        return tabs.map((tab, i) => {
            return (
                <AccordionTab key={tab.header} header={tab.header} disabled={tab.disabled}>
                    {tab.children}
                </AccordionTab>
            );
        });
    };

  return (
    <div>MenuConfig</div>
  )
}
